import { WatchdogLog } from './types';

type WatchdogListener = (status: WatchdogStatus) => void;

interface WatchdogStatus {
  isOnline: boolean;
  isStable: boolean;
  isRecovering: boolean;
  lastError: string | null;
  logs: WatchdogLog[];
}

export class Watchdog {
  private static instance: Watchdog;
  private logs: WatchdogLog[] = [];
  private listeners: Set<WatchdogListener> = new Set();
  private status: WatchdogStatus = {
    isOnline: navigator.onLine,
    isStable: true,
    isRecovering: false,
    lastError: null,
    logs: [],
  };

  private initTimeout: number | null = null;
  private recoveryAttempts = 0;

  private constructor() {
    window.addEventListener('online', this.handleOnline);
    window.addEventListener('offline', this.handleOffline);
    
    // 1. Global App Load Watchdog (simplified)
    this.initTimeout = window.setTimeout(() => {
        if (!this.status.isStable) {
            this.addLog('warn', 'App load timeout detected. Triggering recovery...');
            this.triggerRecovery();
        }
    }, 3000);
  }

  static init() {
    if (!Watchdog.instance) {
      Watchdog.instance = new Watchdog();
    }
    return Watchdog.instance;
  }

  // Public getter for status to fix TypeScript error in UI components
  public getStatus() {
    return this.status;
  }

  static log(message: string) {
    Watchdog.instance?.addLog('info', message);
  }

  static warn(message: string) {
    Watchdog.instance?.addLog('warn', message);
  }

  static error(message: string, code?: string) {
    Watchdog.instance?.addLog('error', message, code);
    Watchdog.instance?.triggerRecovery();
  }

  static subscribe(listener: WatchdogListener) {
    Watchdog.instance?.listeners.add(listener);
    listener(Watchdog.instance.status);
    return () => {
      Watchdog.instance?.listeners.delete(listener);
    };
  }

  static markStable() {
      if(Watchdog.instance) {
          Watchdog.instance.status.isStable = true;
          Watchdog.instance.status.isRecovering = false;
          if (Watchdog.instance.initTimeout) clearTimeout(Watchdog.instance.initTimeout);
          Watchdog.instance.notify();
      }
  }

  private addLog(level: 'info' | 'warn' | 'error', message: string, code?: string) {
    const log: WatchdogLog = { timestamp: Date.now(), level, message, code };
    this.logs.push(log);
    this.status.logs = this.logs.slice(-50); // Keep last 50
    if (level === 'error') {
        this.status.lastError = message;
    }
    this.notify();
    
    // Mock Telemetry Upload
    if (this.status.isOnline) {
       // In real app: navigator.sendBeacon('/api/telemetry', JSON.stringify(log));
       console.log(`[Telemetry] Uploaded: [${level.toUpperCase()}] ${message}`);
    }
  }

  private handleOnline = () => {
    this.status.isOnline = true;
    this.addLog('info', 'Network connection restored');
    this.triggerRecovery();
  };

  private handleOffline = () => {
    this.status.isOnline = false;
    this.addLog('warn', 'Network connection lost. Switching to offline mode.');
    this.notify();
  };

  private triggerRecovery() {
    if (this.recoveryAttempts > 3) {
        this.addLog('error', 'Max recovery attempts reached. Switching to Fallback UI.');
        this.status.isStable = false; // Triggers fallback UI in subscribers
    } else {
        this.status.isRecovering = true;
        this.recoveryAttempts++;
        this.notify();
        
        // Simulate recovery delay
        setTimeout(() => {
            this.status.isRecovering = false;
            this.status.isStable = true;
            this.status.lastError = null;
            this.addLog('info', 'System recovered successfully.');
            this.notify();
        }, 1500);
    }
  }

  private notify() {
    this.listeners.forEach((l) => l({ ...this.status }));
  }

  // Debug method to force failure
  static simulateFailure() {
      Watchdog.instance.addLog('error', 'Simulated Failure');
      Watchdog.instance.status.isStable = false;
      Watchdog.instance.notify();
  }
}