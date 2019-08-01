import React from 'react';
import i18n from 'react-native-localization';
import en from './en';

let L = new i18n({
    en: en
});

const isRTL = () => {
    return strings.getLanguage() === "ar";
}

export { L, i18n, isRTL };