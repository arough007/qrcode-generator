import { useState } from 'react';
import {
  VCardData,
  QRType,
  ColorOptions,
  QRSettings,
  VCardChangeHandler,
  ColorChangeHandler,
  QRSettingsChangeHandler,
} from '../types';
import {
  VCARD_DEFAULTS,
  COLOR_DEFAULTS,
  QR_SETTINGS_DEFAULTS,
} from '../constants';

export interface FormState {
  textInput: string;
  qrType: QRType;
  vcardData: VCardData;
  colors: ColorOptions;
  qrSettings: QRSettings;
  settingsExpanded: boolean;
}

export interface FormActions {
  setTextInput: (value: string) => void;
  setQrType: (type: QRType) => void;
  updateVcardData: VCardChangeHandler;
  updateColors: ColorChangeHandler;
  updateQrSettings: QRSettingsChangeHandler;
  setSettingsExpanded: (expanded: boolean) => void;
  resetForm: () => void;
}

const initialState: FormState = {
  textInput: '',
  qrType: 'text',
  vcardData: VCARD_DEFAULTS,
  colors: COLOR_DEFAULTS,
  qrSettings: QR_SETTINGS_DEFAULTS,
  settingsExpanded: false,
};

export const useFormState = (): [FormState, FormActions] => {
  const [state, setState] = useState<FormState>(initialState);

  const setTextInput = (value: string) => {
    setState(prev => ({ ...prev, textInput: value }));
  };

  const setQrType = (type: QRType) => {
    setState(prev => ({ ...prev, qrType: type }));
  };

  const updateVcardData: VCardChangeHandler = (field, value) => {
    setState(prev => ({
      ...prev,
      vcardData: { ...prev.vcardData, [field]: value },
    }));
  };

  const updateColors: ColorChangeHandler = (field, value) => {
    setState(prev => ({
      ...prev,
      colors: { ...prev.colors, [field]: value },
    }));
  };

  const updateQrSettings: QRSettingsChangeHandler = (field, value) => {
    setState(prev => ({
      ...prev,
      qrSettings: { ...prev.qrSettings, [field]: value },
    }));
  };

  const setSettingsExpanded = (expanded: boolean) => {
    setState(prev => ({ ...prev, settingsExpanded: expanded }));
  };

  const resetForm = () => {
    setState(initialState);
  };

  const actions: FormActions = {
    setTextInput,
    setQrType,
    updateVcardData,
    updateColors,
    updateQrSettings,
    setSettingsExpanded,
    resetForm,
  };

  return [state, actions];
};
