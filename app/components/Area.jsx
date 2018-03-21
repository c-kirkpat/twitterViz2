import React, { Component } from 'react';
import { VictoryArea, VictoryStack, VictoryChart, VictoryTheme } from 'victory'

export default class Area extends Component {
  constructor(props) {
    super(props);
    this.state = {
      catText: [],
      dogText: [],
      pizzaText: []
    };
  }
  // componentDidMount() {

  //   this.setStateInterval = window.setInterval(() => {
  //     this.setState({ catText, dogText, pizzaText });
  //   }, 4000)
  // }

  render() {
    let catText = this.props.pData[0] || [];
    let dogText = this.props.pData[1] || [];
    let pizzaText = this.props.pData[2] || [];
    return (
      <div id={'test'} style={{ height: '300px' }}>
        <VictoryChart>
          <VictoryStack
            colorScale={"blue"}
           >
            <VictoryArea
              data={catText}
              interpolation={"basis"}
            />
            <VictoryArea
              data={dogText}
              interpolation={'basis'}
            />
            <VictoryArea
              data={pizzaText}
              interpolation={'basis'}
            />
          </VictoryStack>
        </VictoryChart>
      </div>

    );
  }
}


  // {this.props.pDatamap((data, i) => {

  //   return (
  //     <VictoryArea
  //       key={i}
  //       data={data}
  //       interpolation={"basis"}
  //     />
  //   );
  // })}