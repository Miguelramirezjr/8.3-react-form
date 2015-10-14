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
    initialContact: React.PropTypes.object.isRequired,
    onSaveContact: React.PropTypes.func.isRequired
  },

  getInitialState() {
    return {
      contact: this.props.initialContact
    };
  },

  handleContactChanged(prop, e) {
    this.setState({
      contact: _.extend({}, this.state.contact, _.object([prop], [e.target.value]))
    });
  },

  saveContact(e) {
    e.preventDefault();
    this.props.onSaveContact(this.state.contact);
  },

  render() {
    return (
      <form className="ContactForm"
        onSubmit={this.saveContact}>

        <input
          onChange={this.handleContactChanged.bind(this, 'name')}
          type="text" placeholder="Name (required)"
          value={this.state.contact.name} />
        <input
          onChange={this.handleContactChanged.bind(this, 'email')}
          type="email"
          placeholder="Email"
          value={this.state.contact.email} />
        <textarea
          onChange={this.handleContactChanged.bind(this, 'description')}
          placeholder="Description"
          value={this.state.contact.description}></textarea>
        <button type="submit">Add Contact</button>
      </form>
    );
  }
});

var ContactsComponent = React.createClass({
  propTypes: {
    initialContacts: React.PropTypes.array.isRequired
  },

  getInitialState() {
    return {
      newContact: {name: "", email: "", description: ""},
      contacts: this.props.initialContacts
    };
  },

  createContact(contact) {
    console.log(contact);
  },

  render() {
    return (
      <div>
        <h1>Hello</h1>
        <ul>
          {
            this.state.contacts
              .filter((c) => c.email)
              .map((contact) => <ContactItem {...contact} />)
          }
        </ul>
        <ContactForm initialContact={this.state.newContact} onSaveContact={this.createContact} />
      </div>
    );
  }
});

var contacts = [
    {key: 1, name: "James K Nelson", email: "james@jamesknelson.com", description: "Front-end Unicorn"},
    {key: 2, name: "Jim", email: "jim@example.com"},
    {key: 3, name: "Joe"},
];

ReactDOM.render(<ContactsComponent initialContacts={contacts} />, document.getElementById('container'));
