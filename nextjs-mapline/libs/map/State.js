import React from 'react';
import useDynamicStateImport from './useDynamicStateImport';

export default function State({ name, onCompleted, onError, ...rest }) {
    const { error, loading, SvgIcon } = useDynamicStateImport(name, { onCompleted, onError });

    if(error) {
        return error.message;
    }
    if(loading) {
        return "";
    }
    if(SvgIcon) {
        return (
            <SvgIcon {...rest} />
        );
    }
    return null;
}