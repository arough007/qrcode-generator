import React from 'react';
import { FormState, FormActions } from '../hooks/useFormState';
import QRTypeSelector from './QRTypeSelector';
import TextInput from './TextInput';
import VCardForm from './VCardForm';

interface InputControlsProps {
  formState: FormState;
  formActions: FormActions;
}

const InputControls: React.FC<InputControlsProps> = ({ formState, formActions }) => {
  return (
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
  );
};

export default InputControls; 