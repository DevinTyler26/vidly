import React from 'react';
import Joi from 'joi-browser';
import Form from './common/form';
import { getMovie, saveMovie } from '../fakeMovieService';
import { getGenres } from '../fakeGenreService';

class MovieForm extends Form {
  state = {
    data: { 
      title: '',
      genreId: '', 
      numberInStock: '',
      dailyRentalRate: '',
    },
    genres: [],
    errors: {}
  }

  schema = {
    _id: Joi.string(),
    title: Joi.string().required().label('Title'),
    genreId: Joi.number().required().label('Genre'),
    numberInStock: Joi.number().required().min(0).max(100).label('Number'),
    dailyRentalRate: Joi.number().required().min(0).max(100).label('Daily Rental Rate'),
  }

  componentDidMount() {
    const genres = getGenres();
    this.setState({ genres });

    const movieId = this.props.match.params.id;
    if (movieId === 'new') return;

    const movie = getMovie(movieId);
    if (!movieId) return this.props.history.replace("/not-found");

    this.setState({ data: this.mapToViewModel(movie) });
  }

  mapToViewModel(movie) {
    return {
      _id: movie._id,
      title: movie.title,
      genreId: movie.genre._id,
      numberInStock: movie.numberInStock,
      dailyRentalRate: movie.dailyRentalRate
    }
  }

  doSubmit = () => {
    saveMovie(this.state.data);
    this.props.history.push('/movies');
  }

  render() { 
    return (
      <div>
        <h1>Register</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput('title', 'Title')}
          {this.renderSelect('genreId', 'Genre', this.state.genres)}          
          {this.renderInput('numberInStock', 'Number in Stock', 'number')}
          {this.renderInput('dailyRentalRate', 'Rate')}                              
          {this.renderButton("Save")}
        </form>
      </div>
    );
  }
}
 
export default MovieForm;