import React from 'react';
import { FormState, FormActions } from '../hooks/useFormState';
import QRTypeSelector from './QRTypeSelector';
import TextInput from './TextInput';
import VCardForm from './VCardForm';
import ColorControls from './ColorControls';
import QRSettings from './QRSettings';

interface QRControlsProps {
  formState: FormState;
  formActions: FormActions;
}

const QRControls: React.FC<QRControlsProps> = ({ formState, formActions }) => {
  return (
    <div className="controls-section">
      <QRTypeSelector
        qrType={formState.qrType}
        onTypeChange={formActions.setQrType}
      />

      {formState.qrType === 'text' ? (
        <TextInput
          value={formState.textInput}
          onChange={formActions.setTextInput}
        />
      ) : (
        <VCardForm
          vcardData={formState.vcardData}
          onDataChange={formActions.updateVcardData}
        />
      )}

      <ColorControls
        colors={formState.colors}
        onColorChange={formActions.updateColors}
      />

      <QRSettings
        settings={formState.qrSettings}
        onSettingsChange={formActions.updateQrSettings}
        isExpanded={formState.settingsExpanded}
        onToggleExpanded={() =>
          formActions.setSettingsExpanded(!formState.settingsExpanded)
        }
      />
    </div>
  );
};

export default QRControls; 