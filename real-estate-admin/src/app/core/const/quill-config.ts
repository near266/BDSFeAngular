import { QuillModules } from "ngx-quill";

export const quillConfig: QuillModules = {
  toolbar: {
    container: [
      ['bold', 'italic', 'underline'],
      // [{ font: [
      //     'SanSerif',
      //     'TimesNewRoman',
      //     'CourierNew',
      //     'Caveat',
      //     'GreatVibes',
      //     'DancingScript',
      //     'PlayBall',
      //     'Montserrat',
      //     'BonaNova',
      //     'Inter',
      //     'Mali',
      //     'Raleway',
      //     'Charm',
      //     'Itim',
      //   ]
      // }],
      [{
        size: ['small', false, 'large', 'huge'],
      }],
      ['code-block'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      [{ color: [] }],
      [{ align: [] }],
      [{ indent: '-1' }, { indent: '+1' }],
      // ['bold', 'italic', 'underline', 'strike'], // toggled buttons
      // [{ header: 1 }, { header: 2 }], // custom button values
      // [{ list: 'ordered' }, { list: 'bullet' }],
      // //[{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
      // //[{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
      // //[{ 'direction': 'rtl' }],                         // text direction

      // //[{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
      // //[{ 'header': [1, 2, 3, 4, 5, 6, false] }],
      // //[{ 'align': [] }],

      // ['clean'], // remove formatting button
      ['link', 'image', 'video']
    ],
    // theme: 'snow',
  },
  // mention: {
  //   allowedChars: /^[A-Za-z\sÅÄÖåäö]*$/,
  //   mentionDenotationChars: ["@", "#"],
  //   source: (searchTerm:string, renderList:any, mentionChar:any) => {
  //     let values;

  //     if (mentionChar === "@") {
  //       values = this.atValues;
  //     } else {
  //       values = this.hashValues;
  //     }

  //     if (searchTerm.length === 0) {
  //       renderList(values, searchTerm);
  //     } else {
  //       const matches = [];
  //       for (var i = 0; i < values.length; i++)
  //         if (~values[i].value.toLowerCase().indexOf(searchTerm.toLowerCase())) matches.push(values[i]);
  //       renderList(matches, searchTerm);
  //     }
  //   },
  // },
  // "emoji-toolbar": true,
  // "emoji-textarea": false,
  // "emoji-shortname": true,
  keyboard: {
    bindings: {
      // shiftEnter: {
      //   key: 13,
      //   shiftKey: true,
      //   handler: (range, context) => {
      //     // Handle shift+enter
      //     console.log("shift+enter")
      //   }
      // },
      enter: {
        key: 13,
        handler: (range: any, context: any) => {
          // console.log("enter");
          return true;
        },
      },
    },
  },
}
