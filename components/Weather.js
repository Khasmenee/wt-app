import React from 'react';
import Forcast from './Forcast';
import { StyleSheet, Text, View ,ImageBackground} from 'react-native';
export default class Weather extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            forcast: {
                main: '-', description: '-', temp: 0
            }
        };
    }
    fetchData = () => {
        fetch(
          `http://api.openweathermap.org/data/2.5/weather?q=${
            this.props.zipCode
          },th&units=metric&AppID=fd68c0f2039c5a25f666a9ff374bc93e`
        )
          .then(response => response.json())
          .then(json => {
            this.setState({
              forcast: {
                main: json.weather[0].main,
                description: json.weather[0].description,
                temp: json.main.temp
              }
            });
          })
          .catch(error => {
            console.warn(error);
          });
      };
      componentDidMount = () => this.fetchData();
      componentDidUpdate = (prevProps) => {
        if(prevProps.zipCode !== this.props.zipCode){
          this.fetchData()
        }
      }
    render() {
        return (
            <View style={styles.container}>
                <ImageBackground source={require('../bg1.jpeg')} style={styles.backdrop}>
                    <View style={styles.top}>
                        <Text style={styles.text}>Zip code is {this.props.zipCode}.</Text>
                        <Forcast {...this.state.forcast} />
                    </View>
                </ImageBackground>
            </View>
        );
    }
   }
   const styles = StyleSheet.create({
    container: { paddingTop: 0 },
    backdrop: { width: '100%', height: '100%'},
    Flex : {
        backgroundColor: '#000000',
        opacity: 0.5,
        height: 250,
        paddingRight: 20,
    },
    top: {
        backgroundColor: "black",
        flexDirection: "column",
        opacity: 0.4,
        height: "50%"
      },
      backdorp: {
        width: "100%",
        height: "100%"
      },
      text: {
        fontSize: 20,
        marginTop: 20,
        color: "white",
        textAlign: "center"
      }
   });

   
   