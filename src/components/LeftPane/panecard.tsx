interface PanecardProps {
    name: string
    address:string
    distance: number    
}
  
export const Panecard:React.FC<PanecardProps> = ({name, address, distance}) => {
   return (<div className='flex justify-between p-5 border-b-2'>
        <div>
            <div>
                {name}
            </div>
            <div>
                {address}
            </div>
        </div>
        <div className='text-green'>
            {distance}km
        </div>
    </div>
   )
}
