export default function GameDisplay({health, machineImage}){
  const healthbars = Array(health).fill(null).map((_, i) =>(
    <div
      key = {i}
      style = {{
        backgroundColor: 'hsl(11, 100%, 41%)', 
        width: '10px', 
        height: '10px',
        border: '1px solid, black ',
        borderRadius: '6px'
      }}
    ></div>
  ))

  return(
    <div className='game-display' style ={{display: 'flex', flexDirection: 'column'}}> 
      {health ? <div className = 'health-display' style = {{display: 'flex', flexDirection: 'row', margin: '3px 0 0 6px'}}>
        {healthbars}
      </div>: null}
      {machineImage ? (<img style = {{
        alignSelf:'center',
        width: 500, 
        height: 400, 
        objectFit: 'contain'
        }} width ={500} height = {400} src={machineImage} alt={"Guess the machine"} />) : (<p style={{textAlign: "center"}}> Machine Image</p>)}
    </div>
  )
}