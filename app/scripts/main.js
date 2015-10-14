var contacts = [
    {key: 1, name: "James K Nelson", email: "james@jamesknelson.com", description: "Front-end Unicorn"},
    {key: 2, name: "Jim", email: "jim@example.com"},
    {key: 3, name: "Joe"},
];

var newContact = {name: "", email: "", description: ""};

var ContactItem = React.createClass({
  propTypes: {
    name: React.PropTypes.string.isRequired,
    email: React.PropTypes.string.isRequired,
    description: React.PropTypes.string
  },

  render() {
    return (
      <li className="ContactItem">
        <h2 className="ContactItem-name">{this.props.name}</h2>
        <a className="ContactItem-email" href={"mailto:" + this.props.email}>{this.props.email}</a>
        <div className="ContactItem-description">{this.props.description}</div>
      </li>
    );
  }
});

var ContactForm = React.createClass({
  propTypes: {
    contact: React.PropTypes.object.isRequired
  },

  render() {
    return (
      <form className="ContactForm">
        <input type="text" placeholder="Name (required)" value={this.props.contact.name} />
        <input type="email" placeholder="Email" value={this.props.contact.email} />
        <textarea placeholder="Description" value={this.props.contact.description}></textarea>
        <button type="submit">Add Contact</button>
      </form>
    );
  }
});

var listElements = contacts
  .filter((c) => c.email)
  .map((contact) => <ContactItem {...contact} />);

var rootElement =
  <div>
    <h1>Hello</h1>
    <ul>
      {listElements}
    </ul>
    <ContactForm contact={newContact} />
  </div>

ReactDOM.render(rootElement, document.getElementById('container'));
