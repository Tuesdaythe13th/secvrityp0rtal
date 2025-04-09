
export interface Command {
  description: string;
  execute: () => string;
}

export type CommandMap = {
  [key: string]: Command;
};

export const commands: CommandMap = {
  help: {
    description: 'Display available commands',
    execute: () => 'Available commands: scan, exploit, crack, clear, help',
  },
  scan: {
    description: 'Scan target network for open ports',
    execute: () => 'Scanning target network...\n> Open ports detected: 22(SSH), 80(HTTP), 443(HTTPS)',
  },
  exploit: {
    description: 'Run exploit framework against target',
    execute: () => 'Initializing exploit framework...\n> Vulnerabilities detected in HTTP service',
  },
  crack: {
    description: 'Attempt to crack passwords',
    execute: () => 'Running password cracking module...\n> Weak credentials found: admin:password123',
  },
  clear: {
    description: 'Clear terminal output',
    execute: () => '',
  },
  dir: {
    description: 'List files in current directory',
    execute: () => '> Directory listing:\n  backdoor.exe\n  exploit-kit/\n  target-data.json\n  readme.txt',
  },
  cat: {
    description: 'Display file contents',
    execute: () => '> File contents:\nThis is a red team simulation environment.\nUse with caution and only on authorized targets.',
  },
  whoami: {
    description: 'Display current user',
    execute: () => '> red-team-operator',
  },
  ssh: {
    description: 'Connect to remote server via SSH',
    execute: () => '> SSH connection attempt...\n> Authentication required\n> Connection failed: Permission denied',
  },
  ping: {
    description: 'Send ICMP packets to host',
    execute: () => '> Pinging target...\n> Response time: 42ms\n> Host is up',
  },
};
