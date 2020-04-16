import React from "react";
import { graphql } from "react-apollo";
import { getBooksQuery } from "../queries/queries";

function BookList(client) {

  function displayBooks() {
    const { loading, books } = client.data;
    if (loading) {
      return <div>Loading books...</div>;
    }
    return books.map((book) => {
      return <li key={book.id}>{book.name}</li>;
    });
  }

  return (
    <div>
      <ul className="book-list">{displayBooks()}</ul>
    </div>
  );
}

export default graphql(getBooksQuery)(BookList);
