import React, { useState } from "react";
import { graphql } from "react-apollo";
import { flowRight as compose } from "lodash";
import { getAuthorsQuery, addBookMutation } from "../queries/queries";

function AddBook(props) {
  const [name, setName] = useState("");
  const [genre, setGenre] = useState("");
  const [authorId, setAuthorId] = useState("");

  function displayAuthors() {
    const { loading, authors } = props.getAuthorsQuery;
    if (loading) {
      return <option disabled>Loading Authors...</option>;
    }
    return authors.map((author) => {
      return (
        <option key={author.id} value={author.id}>
          {author.name}
        </option>
      );
    });
  }

  function submitForm(event) {
    event.preventDefault();
    props.addBookMutation({
      variables: { name: name, genre: genre, authorId: authorId },
    });
  }

  return (
    <form id="add-book" onSubmit={submitForm}>
      <div className="field">
        <label htmlFor="Book name">Book name:</label>
        <input
          type="text"
          placeholder="Your favorite book"
          onChange={(event) => setName(event.target.value)}
        />
      </div>
      <div className="field">
        <label htmlFor="Book genre">Genre:</label>
        <input
          type="text"
          placeholder="Book genre here"
          onChange={(event) => setGenre(event.target.value)}
        />
      </div>
      <div className="field">
        <label htmlFor="Book author">Author:</label>
        <select onChange={(event) => setAuthorId(event.target.value)}>
          <option>Select author</option>
          {displayAuthors()}
        </select>
      </div>
      <button>+</button>
    </form>
  );
}

export default compose(
  graphql(getAuthorsQuery, { name: "getAuthorsQuery" }),
  graphql(addBookMutation, { name: "addBookMutation" })
)(AddBook);
