    //This component display the search result below the search bar in the home page 

    
    import React, { useState , useEffect} from 'react'

    const SearchResultComponent = (data) => {
        const [results ,setresults] = useState("")
        useEffect(() => {
            setresults(data?.data);
          }, [data]);
        console.log(results)
        
    return (
        <div className='flex p-3 hover:bg-slate-100 hover:cursor-pointer'>
            {/* <img className='h-10 w-10 rounded-full' src="/images/plaindp.jpg"></img> */}
            <img className='h-10 w-10 rounded-full' src={results?.picture}></img>
        <div className='ml-4'>
            <p className='font-bold'>{results?.firstname}  {results?.lastname}</p>
            <p>{results?.role} .  {results?.company}  . {results?.field}</p>
        </div>
        </div>
    )
    }

    export default SearchResultComponent
