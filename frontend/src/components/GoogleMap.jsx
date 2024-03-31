

const GoogleMap=({city,state,loc})=>{

  return (
    
    <iframe width="100%" height="350" src={`https://www.google.com/maps?q=[${city},${state}]&output=embed`}></iframe>
  )
}
export default GoogleMap;