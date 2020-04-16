import React from "react";
import { gql } from "apollo-boost";
import { graphql } from "react-apollo";

const getBooksQuery = gql`
  {
    books {
      name
      id
    }
  }
`;

function BookList(client) {
  function displayBooks() {
    const data = client.data;
    console.log(client)
    if (data.loading) {
      return <div>Loading books...</div>;
    }
    return data.books.map((book) => {
      return <li>{book.name}</li>;
    });
  }
  return (
    <div>
      <ul className="book-list">
        {displayBooks()}
      </ul>
    </div>
  );
}

export default graphql(getBooksQuery)(BookList);
