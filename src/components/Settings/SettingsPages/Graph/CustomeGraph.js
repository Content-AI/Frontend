import React from 'react'
import { Bar } from 'react-chartjs-2'
import { 
    Chart as ChartJs,
    CategoryScale,
    LinearScale,
    BarElement,
    Tooltip,
    Legend
} from 'chart.js'

ChartJs.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Tooltip,
    Legend
)


const users = [
    {name:"Jan ",miles_driven:100},
    {name:"Feb ",miles_driven:200},
    {name:"Mar",miles_driven:300},
    {name:"Apr",miles_driven:400},
    {name:"May",miles_driven:400},
    {name:"Jun",miles_driven:30},
    {name:"Jul",miles_driven:100},
    {name:"Aug",miles_driven:20},
    {name:"Oct",miles_driven:25},
    {name:"Nov",miles_driven:20},
    {name:"Dec",miles_driven:2000},
]

const CustomeGraph = () => {
  return (
    <>
        <Bar
            data={{
                labels:users.map(user=>user.name),
                datasets:[
                    {
                        label:"Items Delivered",
                        data:users.map(user=>user.miles_driven),
                        backgroundColor:"rgb(173, 216, 230)"
                    }
                ]
            }}
            width={800}
            height={400}
        />
    </>
  )
}

export default CustomeGraph