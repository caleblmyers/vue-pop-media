<template>
        <div className="Carousel">
        <div className="mx-auto div-featured">
          <img
            id="img-featured"
            className="img-fluid"
            alt={data[index].title || data[index].name}
            src={data[index].backdrop_path
              ? `https://image.tmdb.org/t/p/original/${data[index].backdrop_path}`
              : (type === "episodes" && data[index].still_path)
                ? `https://image.tmdb.org/t/p/original/${data[index].still_path}`
                : Media}
          />
          {type === "episodes"
            ? <div id="caption"><strong>{data[index].title || data[index].name}</strong></div>
            : <Link
              to={`/details/${mediaType}/${data[index].id}`}
              onClick={() => this.props.handler(mediaType, data[index].id)}
            >
              <div id="caption"><strong>{data[index].title || data[index].name}</strong></div>
            </Link>}
          <button onClick={event => this.changeSlide(event)} className="btn" id="prev">&#10094;</button>
          <button onClick={event => this.changeSlide(event)} className="btn" id="next">&#10095;</button>
        </div>
        <div className="mx-auto" id="dot-container">
          {data.map((dot, index) => (
            <span
              key={index}
              id={`${type}${index}`}
              onClick={event => this.goToSlide(type, event)}
              className={`dot ${index === this.state.index ? 'activeDot' : 'inactiveDot'}`}
            ></span>
          ))}
        </div>
      </div>
</template>

<script>
  import { Vue, Component, Prop } from 'vue-property-decorator'

  @Component
  export default class Carousel extends Vue{
  componentDidUpdate() {
    const { data } = this.props
    if (data !== this.state.data) this.setState({
      index: 0,
      data
    })
  }

  changeSlide = e => {
    let { index } = this.state
    e.target.id === "next" ? index++ : index--
    if (index >= this.props.data.length) index = 0
    else if (index <= -1) index = this.props.data.length - 1
    this.setState({ index })
  }

  goToSlide = (type, e) => this.setState({ index: e.target.id.slice(type.length) })

  }
</script>

<style scoped>

</style>