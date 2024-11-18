
import React from 'react';
import { ClipLoader } from 'react-spinners';

const Loader = ({ loading }) => {
    return (
        <>
            <div
                style={{
                    display: loading ? 'flex' : 'none',
                    justifyContent: 'center',
                    alignItems: 'center',
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    backgroundColor: 'rgba(255, 255, 255, 0.7)',
                    zIndex: 9999,
                }}
            >
                <ClipLoader color="#1a4a7c" size={50} loading={loading} />
            </div>
        </>
    );
};

export default Loader;
