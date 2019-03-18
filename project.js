
//@ts-check

import { html, LitElement, css }            from 'lit-element';
import { connect }                          from 'pwa-helpers/connect-mixin.js';
import { store }                            from './store';

import { Fonts }                            from './styles/fonts';
import { Forms }                            from './styles/forms';
import { Show }                             from './styles/on_off';
import { Create }                           from '../styles/create';
import { close, refresh, left, right }      from '../app-elements/icons';

// PROJECT ACTIONS
import {
  industry,
  type,
  nextPage,
  previousPage,
  closeProject
}                                           from './project-action';

// FIREBASE USER
import {
  profileURL,
  firebaseID
}                                           from '../../components/app-elements/firebaseUser';

  // this.shadowRoot.getElementById('add').addEventListener('click', () => { store.dispatch(createProject(true)) } );


class ProjectSnack extends connect(store)(LitElement) {
  
  static get is() { return 'create-project'; }

  static get properties() {
    return {
      // Page Controls
      // _customer:        { type: String },
      _nextPage:        { type: Boolean },
      _previousPage:    { type: Boolean },
      _formPage:        { type: String },
      _formType:        { type: String },
      // _formIndustry:    { type: String },
      // Submit Data
      _phone:           { type: String },
      _email:           { type: String },
      imagePath:        { type: String }
    };
  }

  constructor() {
    super();
  }

  dataTest() {
    console.log( 'user: '           + this.user);
    // console.log( 'customer: '       + this._customer);
    console.log( 'Form Type: '      + this._formType);
    // console.log( 'Form Industry: '  + this._formIndustry);
    console.log( 'Phone Number: '   + this._phone);
    console.log( 'email: '          + this._email);
  }

  firstUpdated() {
    this.shadowRoot.getElementById('remove')            .addEventListener('click',    (e)    => { this._remove(e); }      );
    this.shadowRoot.getElementById('type')              .addEventListener('change',   (e)   => { this._type(e.target.value) }          );
    this.shadowRoot.getElementById('back')              .addEventListener('click',    (e)    => { this._previous(e) }      );    // @click="/${ () => store.dispatch(previousPage())}"
    this.shadowRoot.getElementById('next')              .addEventListener('click',    (e)    => { this._next(e) }          );        // @click="/${ () => store.dispatch(nextPage())}"
    this.shadowRoot.getElementById('submit')            .addEventListener('click',    ()    => { this._createProject(); }      );
    this.shadowRoot.getElementById("input")             .addEventListener("change",   () => { this._handleFiles(); }, false);
  }

  stateChanged(state) {
    // this._customer      = state.projects.option;
    this._formPage      = state.projects.formPage;
    this._formType      = state.projects.types;

    this._project         = state.projects.industry;
    this.customer         = state.projects.customer;
    // -- this._projectOpened   = state.projects.projectState;

    // this._formIndustry  = state.projects.industry;
  }

  _previous(e) {
    e.preventDefault();
    if ( this._formPage <= 0 ) {  }
    else { store.dispatch(previousPage()); }
  }

  _next(e) {
    e.preventDefault();
    if ( this._formPage >= 1 ) {  }
    else { store.dispatch(nextPage()); }
  }

  _handleFiles() {
    const uploader  = this.shadowRoot.getElementById('uploader');
    const file      = this.shadowRoot.getElementById('input').files[0];
    const now       = storageRef.child('/images/' + file.name );
    const task      = now.put(file);
    task.on('state_changed',
      function progress(snapshot) { const percentage = ( snapshot.bytesTransferred / snapshot.totalBytes ) * 100; uploader.value = percentage },
      function error(error) { },
      function complete() { }
    )
    this._imagePath = file.name;
    console.log(this._imagePath);
  }

  _createProject() {
    const user              = firebaseID();
    const pics              = profileURL();
    const title             = this.shadowRoot.getElementById('projectName').value;
    const place             = this.shadowRoot.getElementById('place').value;
    const type              = this.shadowRoot.getElementById('type').value;
    console.log(this._imagePath);
    // const gad = storage.refFromURL( storageRef + "images/" +this._imagePath );
    // const imagesRef         = () => { return storageRef.child(this._imagePath) || 'images/bee.jpg' ; };
    firebase.firestore().collection(user).doc(title).set({
      user:                user,
      icon:                pics,  
      project:             title,
      location:            place,
      type:                type,
      // image:               'images/bee.jpg',
      image:               this._imagePath,
      // imageRef:            ,
    }).then( () => {
      firebase.firestore().collection("index").doc( title + ":" + user ).set({ user: user, project : title });
      console.log("Document successfully written!");
    }).catch( (error) => {
      console.error('Error writing new message to Firebase Database', error);
    });
    store.dispatch(closeProject());
  }

  _industry(e) {
    store.dispatch(industry(e));
   }
 
   _type(e) {
     e.preventDefault();
     store.dispatch(type(e));
   }
 
   _remove(e) {
     e.preventDefault();
     store.dispatch(closeProject(false));
   }
 

  static get styles() {
    return [
      Forms,
      Fonts,
      Create,
      Show,
      css`

      :host {
        display:                block;
        /* max-width:              400px; */
        /* margin:                 auto; */
        box-sizing:             border-box;
        position:               fixed;
        bottom:                 0;
        left:                   0;
        right:                  0;
        color:                  white;
        text-align:             right;
        will-change:            transform;
        transform:              translate3d(0, 100%, 0);
        transition-property:    visibility, transform;
        transition-duration:    0.2s;
        visibility:             hidden;
        color:                  var(--app-black-color);
      }
    
      :host([active]) {
        visibility:             visible;
        transform:              translate3d(0, 0, 0);
      }

      .slip             { display:        none; }
      .slip[active]     { display:        block; }
      .multi            { display:        none; }
      .multi[activated] { display:        block; }

      input[type=text], select { width: 200px; }
      #input { margin: 16px auto; }
      #uploader { -webkit-appearance: none: appearance: none;}
    `]}

render() {
  return html`

  
  <!-- OPEN PROJECT MENU -->
  <button id="add" class="addPost" aria-label="form">${add}</button>

  import {
    createProject
  }                                     from '../actions/projects';
  import { add }                        from './app-elements/icons';
  
  <!-- CREATE PROJECT POST -->
  <project-snack          ?active="${ this._projectOpened }"></project-snack>


  <!-- FORM SNACK -->
  <form class="snack">

    <!-- FORM HEADER -->
    <div class="exit">
      <button type=reset class="refresh">${refresh}</button>
      <h3 class="create" >New Project</h3>
      <button id="remove" class="remove" >${close}</button>
    </div>

    <!-- FORM BODY -->
    <div id="createProject">

        <!-- New Project Type -->
        <div class="slip" ?active="${ this._formPage === 0 }">
          <!-- Title -->
          <p><label>Title<input id="projectName" type=text></label></p>
          <!-- Sector -->
          <p><label>Sector
              <select id="type">
                <option>New construction</option>
                <option selected >Renovation</option>
                <option disabled>residential</option>
                <option>Maintanance</option>
                <option>Sustainability</option>
                <option disabled>non-residential</option>
                <option>Commercial</option>
                <option>Institutional</option>
              </select>
            </label>
          </p>
          <!-- Location -->
          <p><label>Location<input type=text id="place" /></label></p>
        </div>

        <!-- Create Project Management -->
        <div class="slip" ?active="${ this._formPage === 1 }">
          <!-- Photo -->
          <p><label>Upload a Project Photo: <progress value="0" max="100" id="uploader">0%</progress><input type="file" id="input" accept="image/*" multiple ></label></p>
        </div>

        <!-- Submit -->
        <div class="slip" ?active="${ this._formPage === 2 }">
          <button @click= ${ () => this._createProject() }>Create</button>
        </div>

      </div>

      <!-- FORM NAVIGATION -->
      <div>
        <div class="navigation" id="navigation">

          <button
            id="back"
            type="button"
            class="visible project-action"
            ?on=${ this._formPage >= 1 }
            ><p class="create">Profile</p>
          </button> <!-- nextPrev(-1) -->

          <div
            id="next"
            class="visible"
            ?on=${ this._formPage <= 1 }>
            <button class="spec project-action" ?on=${ this._formPage === 0 }>Photo</button>
            <button class="spec project-action" ?on=${ this._formPage === 1 } id="submit"><p class="create">Submit</p></button>
          </div> <!-- nextPrev(1) -->
        </div>

      </div>

      <!-- CLOSE SNACK WRAPPER -->
</form>

    `;
  }
}

window.customElements.define('project-snack', ProjectSnack);




/*

  data() {
    // firebaseProjects
    //   .onSnapshot( (querySnapshot) => { store.dispatch( fireList( querySnapshot.docs )); });
  }


    <!-- PAGE INDICATOR
    <div class="note">\${this._formPage +1} / 3</div> -->

        <!-- INDUSTRY 
            <p><label>Construction Industry
              <select id="industry">
                <option>Commercial</option>
                <option selected >Residential</option>
              </select>
             </label>
            </p> -->


          <h3>Review</h3>
            <p>\${this.user}</p>
            <p>\${this._customer}</p>
            <p>\${this._formType}</p>
            <p>\${this._formIndustry}</p>
            <p>\${this._phone}</p>
            <p>\${this._email}</p>


    <button   type=submit   class="x-font"   id="create"                 >Initiate</button>

    class="slip" ?active="\${ this._customer === 'contractor' }"


        <!-- Circles which indicates the steps of the form:
        <div style="text-align:center;margin-top:40px;">
          <span class="step" ?selected="\${_formPage === 'one'}"   ></span>
          <span class="step" ?selected="\${_formPage === 'two'}"   ></span>
          <span class="step" ?selected="\${_formPage === 'three'}" ></span>
        </div>  -->


          Residential / Commercial

          <label>
            <select name="seek"  @change="\${(ev) => store.dispatch(load(ev.target.value)) }">
              <option value="Homeowner"       >New Construction            </option>
              <option value="Contractor"      >Renovation   </option>
              <option value="Subcontractor"   >Subcontractor        </option>
              <option value="Labourer"        >Labourer             </option>
              <option value="Supplier"        >Supplier             </option>
              <option value="Agency"          >Agency               </option>
            </select>
            Looking for
          </label>
        </div>





<fieldset id="project-post" class="slip" ?active="\${ this._customer === 'subontractor' }"> <!--  -->
<legend>Project</legend>
    <p><label>Contact Name:    <input id="homeowner"           type=text     name="name"       placeholder="John Green"></label></p>
    <p><label>Phone Number:    <input id="customerPhone"       type=tel      name="phone"      placeholder="(555) 555-5555"></label></p>
    <p><label>Email:           <input id="customerEmail"       type=email    name="email"      placeholder="email@network.com"></label></p>
    <p><label>Address:         <input id="projectLocation"     type=text     name="location"   placeholder="123 Home st."></label></p>
    <button   type="button"    @click="\${ () => this.createProject()}"            >Submit</button>   
</fieldset>

<fieldset id="supplier-profile" class="slip" ?active="\${ this._customer === 'supplier' }"> <!--  -->
  <legend>Supplier</legend>
  <p><label>Contact Name    <input id="supplier"            type=text     name="name"       placeholder="John Green"></label></p>
  <p><label>Question # 4    <input id="customerPhone"       type=tel      name="phone"      placeholder="(555) 555-5555"></label></p>
  <p><label>Question # 5    <input id="customerEmail"       type=email    name="email"      placeholder="email@network.com"></label></p>
  <p><label>Question # 6    <input id="projectLocation"     type=text     name="location"   placeholder="123 Home st."></label></p>
  <button   type="button"    @click="\${ () => this.supplier()}"            >Submit</button>
</fieldset>

<fieldset id="Agency-profile" class="slip" ?active="\${ this._customer === 'agency' }"> <!--  -->
  <legend>Agency</legend>
  <p><label>Contact Name    <input id="agency"              type=text     name="name"       placeholder="John Green"></label></p>
  <p><label>Question # 4    <input id="customerPhone"       type=number   name="phone"      placeholder="(555) 555-5555"></label></p>
  <p><label>Question # 5    <input id="customerEmail"       type=email    name="email"      placeholder="email@network.com"></label></p>
  <p><label>Question # 6    <input id="projectLocation"     type=text     name="location"   placeholder="123 Home st."></label></p>
  <button   type="button"    @click="\${ () => this.agency()}"            >Submit</button>
</fieldset>

<div class="slip" ?active="\${ this._customer === 5 }"> <!-- 'agency' -->
  <p><label>Brand Name<input type="text" id="user" placeholder="Waldo"/></label></p>
  <p><input id="businessName"        type=text    name="business"   autocomplete="organization"     placeholder="Business Name"></p>
  <p><input id="customerName"        type=text    name="contact"    autocomplete="given-name"       placeholder="Contact Person"></p>
  <p><label>Reply to Phone Number   <input id="customerPhone"       type=number   name="phone"      autocomplete="phone number" inputmode="numeric" pattern="[0-9]{8,19}"></label></p>
  <p><label>Reply to E-malil        <input id="customerEmail"       type=email    name="email"      autocomplete="email"></label></p>
  <p><label>Location                <input id="projectLocation"     type=text     name="location"   autocomplete="street-address"></label></p>
  <p><label>Project Name            <input id="projectName"         type=text     name="project"    ></label></p>
  <p><label>Project Category        <input id="projectType"         type=text     name="category"   ></label></p>
  <p><label>Project Start Date:     <input id="projectStart"        type=date     name="date"       ></label></p>
  <p><input type="text" placeholder="labourers"></p>
  <p><label><input type=checkbox>Contractors</label></p>
  <p><label><input type=checkbox>Employment</label></p>
  <p><label>Delivery instructions:<textarea name="comments" maxlength=1000></textarea></label></p>
</div>


    // this.shadowRoot.getElementById('industry')          .addEventListener('change',   (e)   => { this._industry(e.target.value) }      );
    // this.shadowRoot.getElementById('submit')            .addEventListener('click',    (e)   => { this._createProject(e); }      );
    // this.shadowRoot.getElementById('createProject')     .addEventListener('click',  e => { e.preventDefault(); });
    // this.shadowRoot.getElementById('createProject')     .addEventListener('click',  (e)   => { this._createProject(e); }      );
    // this.shadowRoot.getElementById('place')             .addEventListener('onchange',  (e)   => { this._place(e.target.value) }              );
    // this.data();;
        /*
    this._nextPage      = state.projects.projectState;
    this._previousPage  = state.projects.projectState;
    this._clicks        = state.counter.clicks;
    this._value         = state.counter.value;

    

      // _pause()  { uploadTask.pause(); }
  // _resume() { uploadTask.resume(); }
  // _cancel() { uploadTask.cancel(); }
  // _submit(e) { e.preventDefault(); };
  // _previousPage() { store.dispatch(previousPage()); }
  // _nextPage(){ store.dispatch(nextPage()); }
  /*
  _place(e) {
    this._city = e;
    console.log(e);
    console.log(this._city);
  }
  


*/