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
    <>
      <div className="input-controls">
        <QRTypeSelector
          qrType={formState.qrType}
          onTypeChange={formActions.setQrType}
        />

        <div className="input-content-container">
          {formState.qrType === 'text' ? (
            <div className="text-input-container">
              <TextInput
                value={formState.textInput}
                onChange={formActions.setTextInput}
              />
            </div>
          ) : (
            <div className="vcard-form">
              <VCardForm
                vcardData={formState.vcardData}
                onDataChange={formActions.updateVcardData}
              />
            </div>
          )}
        </div>
      </div>

      <div className="qr-settings-controls">
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
    </>
  );
};

export default QRControls; 