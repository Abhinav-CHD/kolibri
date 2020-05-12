import { createTranslator } from 'kolibri.utils.i18n';

const taskStrings = createTranslator('TaskStrings', {
  // Generic Task strings
  taskWaitingStatus: {
    message: 'Waiting',
    context: 'Generic task status',
  },
  taskCanceledStatus: {
    message: 'Canceled',
    context: 'Generic task status',
  },
  taskCancelingStatus: {
    message: 'Canceling',
    context: 'Generic task status',
  },
  taskFinishedStatus: {
    message: 'Finished',
    context: 'Generic task status',
  },
  taskFailedStatus: {
    message: 'Failed',
    context: 'Generic task status',
  },
  taskUnknownStatus: {
    message: 'Unknown',
    context: 'A catch-all status for unknown task statuses',
  },
  taskStartedByLabel: {
    message: `Started by '{username}'`,
    context: 'Displays the user that started a task',
  },
  clearCompletedTasksAction: {
    message: 'Clear completed',
    context: 'Label for buttons that clear completed tasks',
  },
  unknownUsername: {
    message: 'Unknown user',
    context: 'A placeholder username if the username is not attached to Task',
  },

  // Sync Facility Task strings
  establishingConnectionStatus: {
    message: 'Establishing connection',
    context: 'Sync task status',
  },
  remotelyPreparingDataStatus: {
    message: 'Remotely preparing data',
    context: 'Sync task status',
  },
  receivingDataStatus: {
    message: 'Receiving data',
    context: 'Sync task status',
  },
  locallyIntegratingDataStatus: {
    message: 'Locally integrating received data',
    context: 'Sync task status',
  },
  locallyPreparingDataStatus: {
    message: 'Locally preparing data to send',
    context: 'Sync task status',
  },
  sendingDataStatus: {
    message: 'Sending data',
    context: 'Sync task status',
  },
  remotelyIntegratingDataStatus: {
    message: 'Remotely integrating data',
    context: 'Sync task status',
  },
  syncFacilityTaskLabel: {
    message: `Sync '{facilityName}'`,
    context: 'Description of sync-facility task',
  },
  syncStepAndDescription: {
    message: '{step, number} of {total, number}: {description}',
    context: 'Template for message of the form "Step 1 of 7: Establishing connection"',
  },
  syncBytesSentAndReceived: {
    message: `{bytesSent} sent • {bytesReceived} received`,
    context: 'Amounts of data transferred in sync task',
  },

  // Remove Facility Task strings
  removingFacilityStatus: {
    message: 'Removing facility',
    context: 'Remove facility task status',
  },
  removeFacilityTaskLabel: {
    message: `Remove '{facilityName}'`,
    context: 'Description of a remove-facility task',
  },
  removeFacilitySuccessStatus: {
    message: 'Facility successfully removed',
    context: 'Message that shows after Facility is successfully removed',
  },

  // Import Facility Task strings
  importSuccessStatus: {
    message: `'{facilityName}' successfully loaded to this device`,
    context: '',
  },
  importFailedStatus: {
    message: `Could not load '{facilityName}' to this device`,
    context: '',
  },
});

export function getTaskString(...args) {
  return taskStrings.$tr(...args);
}

export default {
  methods: {
    getTaskString,
  },
};
