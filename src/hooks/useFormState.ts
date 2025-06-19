import { useState, useCallback } from 'react';
import { VCardData, QRType, ColorOptions, QRSettings } from '../types';
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
  updateVcardData: (field: keyof VCardData, value: string) => void;
  updateColors: (field: keyof ColorOptions, value: any) => void;
  updateQrSettings: (field: keyof QRSettings, value: any) => void;
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

  const setTextInput = useCallback((value: string) => {
    setState(prev => ({ ...prev, textInput: value }));
  }, []);

  const setQrType = useCallback((type: QRType) => {
    setState(prev => ({ ...prev, qrType: type }));
  }, []);

  const updateVcardData = useCallback((field: keyof VCardData, value: string) => {
    setState(prev => ({
      ...prev,
      vcardData: { ...prev.vcardData, [field]: value },
    }));
  }, []);

  const updateColors = useCallback((field: keyof ColorOptions, value: any) => {
    setState(prev => ({
      ...prev,
      colors: { ...prev.colors, [field]: value },
    }));
  }, []);

  const updateQrSettings = useCallback((field: keyof QRSettings, value: any) => {
    setState(prev => ({
      ...prev,
      qrSettings: { ...prev.qrSettings, [field]: value },
    }));
  }, []);

  const setSettingsExpanded = useCallback((expanded: boolean) => {
    setState(prev => ({ ...prev, settingsExpanded: expanded }));
  }, []);

  const resetForm = useCallback(() => {
    setState(initialState);
  }, []);

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