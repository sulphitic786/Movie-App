import React, { Component } from 'react';
import './styles/styles.css';
import Navbar from './components/Navbar';
import Banner from './components/Banner';
import Row from './components/Row';
import requests from './requests';
import MovieList from './components/MovieList';
import AddMovie from './components/AddMovie';
import uuid from 'react-uuid';
import Footer from './components/Footer';


class App extends Component {

  state= {
    showPopup : false,
    movieList : [
      {id:uuid(),rating:10,title:'Limitless',img:'https://images-na.ssl-images-amazon.com/images/I/51LmThoTu2L._AC_.jpg'},
      {id:uuid(),rating:7.5,title:'Avangers',img:'https://images-na.ssl-images-amazon.com/images/I/81ai6zx6eXL._AC_SL1304_.jpg'},
      {id:uuid(),rating:9,title:'Harry Potter',img:'https://www.posters.be/fr/media/catalog/product/cache/cb3faf85ecb1e071fdba48f981c86454/g/b/gb_fp2601_2.jpg'},
    ],
    sortType : "title"
  }

handleShowAdd (){
  this.setState ({
    showPopup : true
  })
}

handleShowClose (){
  this.setState ({
    showPopup : false
  })
}

addMovie = (newMovie) =>{
  newMovie['id']=uuid();
  this.setState({
    movieList : [newMovie,...this.state.movieList],
    showPopup : false
  })
  
}


sortList = () => {
  if(this.state.sortType==="rating"){
    this.setState({
      movieList : this.state.movieList.sort((movie1,movie2)=>(movie2.rating-movie1.rating))
    })
  }else{
    this.setState({
      movieList : this.state.movieList.sort((movie1,movie2)=>(movie1.title.toLowerCase().localeCompare(movie2.title.toLowerCase())))
    })
  }
  
}

filterChanging = (typefltr) => {
  this.setState({sortType:typefltr}) 
  this.sortList(this.state.sortType)
  console.log(this.state.movieList)
}

componentDidMount(){this.sortList()}

  render() {
    return (
      <div className="App">
        {this.state.showPopup && <AddMovie addClick={(newMovie)=>this.addMovie(newMovie)} onPopupClose={this.handleShowClose.bind(this)}/>}
        <div className={`${this.state.showPopup?"blurred":null}`}> 
          <Navbar />
          <Banner fetchUrl={requests.trending}/>
          <MovieList movies={this.state.movieList}  onShowChange={this.handleShowAdd.bind(this)} handleFiltered={(typefltr)=>this.filterChanging(typefltr)}/>
          <Row title="Trending Now" fetchUrl={requests.trending}/>
          <Row title="Comedies" fetchUrl={requests.comedy}/>
          <Row title="Horror" fetchUrl={requests.horror}/>
          <Row title="Documentaries" fetchUrl={requests.documentaries} />
        </div>
        <Footer/>
      </div>
    )
  }
}

export default App
