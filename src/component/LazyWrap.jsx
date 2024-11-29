import { Suspense } from 'react';


const LazyWrap= ({Component})=>{
    return (
        <Suspense fallback={<div>loading...</div>}>
            <Component />
        </Suspense>
    );
};

export default LazyWrap;