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
    contact: React.PropTypes.object.isRequired,
    onContactChanged: React.PropTypes.func.isRequired
  },

  handleContactChanged(prop, e) {
    var oldContact = this.props.contact;
    var newData = {};
    newData[prop] = e.target.value;
    var newContact = _.extend({}, oldContact, newData);
    this.props.onContactChanged(newContact);
  },

  render() {
    return (
      <form className="ContactForm">
        <input onChange={this.handleContactChanged.bind(this, 'name')} type="text" placeholder="Name (required)" value={this.props.contact.name} />
        <input onChange={this.handleContactChanged.bind(this, 'email')} type="email" placeholder="Email" value={this.props.contact.email} />
        <textarea onChange={this.handleContactChanged.bind(this, 'description')} placeholder="Description" value={this.props.contact.description}></textarea>
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

  contactChanged(contact) {
    this.setState({
      newContact: contact
    });
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
        <ContactForm contact={this.state.newContact} onContactChanged={this.contactChanged}/>
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
