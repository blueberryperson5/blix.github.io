import { useEffect, useRef, useState } from 'react';

export default function useDynamicMapSvgImport(name, options = {}) {
    const ImportedIconRef = useRef();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState();
  
    const { onCompleted, onError } = options;

    useEffect(() => {
      setLoading(true);
      const importIcon = async () => {
        try {
          const { default: namedImport } = await
            import(`../../public/map/${name}.svg`);
          ImportedIconRef.current = namedImport;
          if(onCompleted) {
            onCompleted(name, ImportedIconRef.current);
          }
        } catch(err) {
          if(onError) {
            onError(err);
          }
          setError(err);
        } finally {
          setLoading(false);
        }
      };
      importIcon();
    }, [name, onCompleted, onError]);
  
    return { error, loading, SvgIcon: ImportedIconRef.current };
  };