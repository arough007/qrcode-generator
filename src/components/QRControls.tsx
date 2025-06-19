import React from 'react';
import { FormState, FormActions } from '../hooks/useFormState';
import ColorControls from './ColorControls';
import QRSettings from './QRSettings';

interface QRControlsProps {
  formState: FormState;
  formActions: FormActions;
}

const QRControls: React.FC<QRControlsProps> = ({ formState, formActions }) => {
  return (
    <div className="qr-controls">
      <div className="color-controls-section">
        <ColorControls
          colors={formState.colors}
          onColorChange={formActions.updateColors}
        />
      </div>

      <div className="qr-settings-section">
        <QRSettings
          settings={formState.qrSettings}
          onSettingsChange={formActions.updateQrSettings}
          isExpanded={formState.settingsExpanded}
          onToggleExpanded={() =>
            formActions.setSettingsExpanded(!formState.settingsExpanded)
          }
        />
      </div>
    </div>
  );
};

export default QRControls;
