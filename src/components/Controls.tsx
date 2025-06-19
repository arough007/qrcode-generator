import React from 'react';
import { FormState, FormActions } from '../hooks/useFormState';
import QRTypeSelector from './QRTypeSelector';
import TextInput from './TextInput';
import VCardForm from './VCardForm';

interface ControlsProps {
  formState: FormState;
  formActions: FormActions;
}

const Controls: React.FC<ControlsProps> = ({ formState, formActions }) => {
  return (
    <div className="input-controls">
      <div role="group" aria-labelledby="qr-type-group-title">
        <h3 id="qr-type-group-title" className="sr-only">
          QR Code Type Selection
        </h3>
        <QRTypeSelector
          qrType={formState.qrType}
          onTypeChange={formActions.setQrType}
        />
      </div>

      <div
        className="input-content-container"
        role="group"
        aria-labelledby="content-input-group-title"
      >
        <h3 id="content-input-group-title" className="sr-only">
          {formState.qrType === 'text'
            ? 'Text Content Input'
            : 'Contact Information Input'}
        </h3>
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

export default Controls;
