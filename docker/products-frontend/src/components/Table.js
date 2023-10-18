import React from "react"
const Row = ({record})=>{
    const keys = Object.keys(record)
    return (
    <tr key ={record.uuid}>

        {
            keys.map(key => <td key={key}> {record[key]} </td>)
        }

        
    </tr>)
}
const Table = ({data}) => {
    const keys = Object.keys(data[0])
    return  (
        <table>
            <thead>
                <tr>
                    {
                        keys.map(key => <th key={key}>{key}</th> )
                    }
                </tr>
            </thead>
            <tbody>
                {
                    data.map(record => <Row record={record}/>)
                }
            </tbody>
        </table>
    )
}

export default Table; 