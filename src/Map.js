import * as d3 from 'd3'
import { useEffect } from 'react'
import './Map.css'


const Map = ({ base, values, padding, height, width }) => {

    useEffect(()=> {
        heatMap();
    }, [values])

    const heatMap = () => {
        const minYear = d3.min(values, (d) => d['year'])
        const maxYear = d3.max(values, (d) => d['year'])
        var months = ["January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"]

        const tooltip = d3.select('#tooltip')
                            .style('visibility', 'hidden')
        
        const yScale = d3.scaleTime()
            .domain([new Date(0, 0, 0, 0, 0, 0, 0), new Date(0, 12, 0, 0, 0, 0, 0)])
            .range([padding , height - padding])
        const xScale = d3.scaleLinear()
            .domain([minYear, maxYear + 1])
            .range([padding, width - padding])

        const yAxis = d3.axisLeft(yScale).tickFormat(d3.timeFormat('%B'))
        const xAxis = d3.axisBottom(xScale).tickFormat(d3.format('d'))

        const axisLeft = d3.select('svg')
            .append('g').call(yAxis)
            .attr('id', 'y-axis')
            .attr('transform', 'translate(' + padding + ' 0)');
        
        const axisBottom = d3.select('svg')
            .append('g')
            .call(xAxis)
            .attr('id', 'x-axis')
            .attr('transform', 'translate(0,' + (height - padding) + ')');

        const cell = d3.select('svg')
            .selectAll('rect')
            .data(values)
            .enter()
            .append('rect')
            .attr('class', 'cell')
            .attr('fill', (d) => {
                const temp = d.variance;
                if(temp <= -1 ){
                    return 'SteelBlue'
                } else if (temp <= 0){
                    return 'LightSteelBlue'
                } else if(temp <= 1) {
                    return 'Orange'
                } else {
                    return 'Crimson'
                }
            })
            .attr('data-month', (d) => d['month'] - 1)
            .attr('data-year', (d) => d['year'])
            .attr('data-temp', (d) => base + d['variance'])
            .attr('height', (height - (padding * 2 )) / 12)
            .attr('y', (d) => yScale(new Date(0, d['month'] - 1, 0, 0, 0, 0, 0)))
            .attr('width', (d) => {
                let numOfYears = maxYear - minYear;
                return (width - (2 * padding))/ numOfYears
            }) 
            .attr('x', d => {
                return xScale(d['year'])
            })
            .on('mouseover', (e, item) => {
                tooltip.style('visibility', 'visible')
                    .html(`${item.year} - ${months[item.month - 1]} <br/>
                    ${item.variance}C° <br /> ${(base + item.variance).toFixed(3)}C°`)
                    .style('left', (e.pageX + 10) + 'px')
                    .style('top', (e.pageY + 10) + 'px')
                    .attr('data-year', item.year)
            })
            .on('mouseout', () => {
                tooltip.style('visibility', 'hidden')
            })


    }

    return (
            <svg width={width} height={height}></svg>
    )
}

export default Map;