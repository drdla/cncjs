// AXES
export const AXIS_E = 'e';
export const AXIS_X = 'x';
export const AXIS_Y = 'y';
export const AXIS_Z = 'z';
export const AXIS_A = 'a';
export const AXIS_B = 'b';
export const AXIS_C = 'c';

export const MM_PER_INCH = 25.4;

// Imperial System
export const IMPERIAL_UNITS = 'in';
export const IMPERIAL_STEPS = [
  0.001,
  0.01,
  0.1,
  1, // Default
  10,
];

// Metric System
export const METRIC_UNITS = 'mm';
export const METRIC_STEPS = [
  0.001,
  0.01,
  0.1,
  1, // Default
  10,
  100,
];

// Controller
export const GRBL = 'Grbl';
export const MARLIN = 'Marlin';
export const SMOOTHIE = 'Smoothie';
export const TINYG = 'TinyG';

// Workflow State
export const WORKFLOW_STATE_IDLE = 'idle';
export const WORKFLOW_STATE_PAUSED = 'paused';
export const WORKFLOW_STATE_RUNNING = 'running';

// Grbl Machine State
export const GRBL_MACHINE_STATE_IDLE = 'Idle';
export const GRBL_MACHINE_STATE_RUN = 'Run';
export const GRBL_MACHINE_STATE_HOLD = 'Hold';
export const GRBL_MACHINE_STATE_DOOR = 'Door';
export const GRBL_MACHINE_STATE_HOME = 'Home';
export const GRBL_MACHINE_STATE_SLEEP = 'Sleep';
export const GRBL_MACHINE_STATE_ALARM = 'Alarm';
export const GRBL_MACHINE_STATE_CHECK = 'Check';

// Smoothie Machine State
export const SMOOTHIE_MACHINE_STATE_IDLE = 'Idle';
export const SMOOTHIE_MACHINE_STATE_RUN = 'Run';
export const SMOOTHIE_MACHINE_STATE_HOLD = 'Hold';
export const SMOOTHIE_MACHINE_STATE_DOOR = 'Door';
export const SMOOTHIE_MACHINE_STATE_HOME = 'Home';
export const SMOOTHIE_MACHINE_STATE_SLEEP = 'Sleep';
export const SMOOTHIE_MACHINE_STATE_ALARM = 'Alarm';
export const SMOOTHIE_MACHINE_STATE_CHECK = 'Check';

// TinyG Machine State
// https://github.com/synthetos/g2/wiki/Status-Reports#stat-values
export const TINYG_MACHINE_STATE_INITIALIZING = 0; // Machine is initializing
export const TINYG_MACHINE_STATE_READY = 1; // Machine is ready for use
export const TINYG_MACHINE_STATE_ALARM = 2; // Machine is in alarm state
export const TINYG_MACHINE_STATE_STOP = 3; // Machine has encountered program stop
export const TINYG_MACHINE_STATE_END = 4; // Machine has encountered program end
export const TINYG_MACHINE_STATE_RUN = 5; // Machine is running
export const TINYG_MACHINE_STATE_HOLD = 6; // Machine is holding
export const TINYG_MACHINE_STATE_PROBE = 7; // Machine is in probing operation
export const TINYG_MACHINE_STATE_CYCLE = 8; // Reserved for canned cycles (not used)
export const TINYG_MACHINE_STATE_HOMING = 9; // Machine is in a homing cycle
export const TINYG_MACHINE_STATE_JOG = 10; // Machine is in a jogging cycle
export const TINYG_MACHINE_STATE_INTERLOCK = 11; // Machine is in safety interlock hold
export const TINYG_MACHINE_STATE_SHUTDOWN = 12; // Machine is in shutdown state. Will not process commands
export const TINYG_MACHINE_STATE_PANIC = 13; // Machine is in panic state. Needs to be physically reset
