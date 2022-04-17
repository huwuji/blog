import React,{useState,useEffect,useCallback} from 'react';

function MyInfo() {
  const [name,setName]=useState('myinfo');

  useEffect(()=>{
    console.log('useEffect');
    setName('myinfo_0');
  },[]);
  
  const onClick=useCallback(()=>{
    setName('myinfo_1');
  },[]);

  return (
    <div 
    className="MyInfo" 
    onClick={onClick}
    >
        {name}
    </div>
  );
}

export default MyInfo;