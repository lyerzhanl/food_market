import React, { Component } from 'react';

export class Categories extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [{ ID: 0, categoryName: 'All' }],
      showScrollIndicator: false,
    };
  }
  componentDidMount() {
    fetch('http://localhost:4001/categories')
      .then((response) => response.json())
      .then((data) => {
        const updatedCategories = [{ ID: 0, categoryName: 'All' }, ...data];
        this.setState({ categories: updatedCategories });
        this.checkOverflow();
      })
      .catch((error) => console.error('Error fetching data:', error));
  }

  checkOverflow() {
    const categoriesContainer = document.querySelector('.categories-carousel')
    const showScrollIndicator =
        categoriesContainer.scrollWidth > categoriesContainer.clientWidth;
    this.setState({ showScrollIndicator });
  }

  render() {
    return (
      <div className="categories">
        <div className="categories-carousel">
          {this.state.categories.map((e) => (
              <div
                  key={e.categoryName}
                  onClick={() => this.props.chooseCategory(e.ID)}
              >
                {e.categoryName}
              </div>
          ))}
        </div>
        {this.state.showScrollIndicator && (
            <div className="scroller" onClick={this.scrollRight}>
              &gt;
            </div>
        )}
      </div>
    );
  }

  scrollRight() {
    const categoriesContainer = document.querySelector('.categories-carousel')
    categoriesContainer.scrollLeft += 100;
  }
}

export default Categories;
