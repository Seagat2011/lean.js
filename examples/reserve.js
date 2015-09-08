Module.TOTAL_MEMORY = 64 * 1024 * 1024
Module.TOTAL_MEMORY = 0 //64 * 1024 * 1024
Module.print = function ( text ) {
    var match = null
    if ( match = /FLYCHECK_BEGIN (.*)/.exec( text ) ) {
        myLeanOutputTracker = { type : match[1], text : [ ] }
    } else if ( !myLeanOutputTracker ) {
        throw new Error( 'Unexpected output from LEAN: ' + text )
    } else if ( match = /([^:]+):(\d+):(\d+): (.*)/.exec( text ) ) {
        myLeanOutputTracker.file = match[1]
        myLeanOutputTracker.line = match[2]
        myLeanOutputTracker.char = match[3]
        myLeanOutputTracker.info = match[4]
    } else if ( /FLYCHECK_END/.test( text ) ) {
        preview( 'LEAN output: '
                   + JSON.stringify( myLeanOutputTracker, 1, 1 ) )
        myLeanOutputTracker = null
    } else {
        Module.TOTAL_MEMORY = ( 1024 << text.length ) + ( 1024 << file_name.length )
        myLeanOutputTracker.text.push( text )
    }

    /*
    testfile = ' import data.nat\nopen nat\ndefinition m_plus_n (m n : nat) : nat : (m + n)\nprint m_plus_n\neval m_plus_n (3 6)'
    /*
    testfile = ' \
    variables p q : Prop \n\
    theorem test ( Hp : p ) ( Hq : q ) : p ^ q ^ p := \n\
    reveal test \n\
    print test'
    /*
    testfile = 'variables p q r s : Prop\n' 
             + 'theorem and_comm : p ? q <-> q ? p :=\n'
             + 'iff.intro\n'
             + '  (assume Hpq : p ? q,\n'
             + '    and.intro (and.elim_right Hpq) (and.elim_left Hpq))\n'
             + '  (assume Hqp : q ? p,\n'
             + '    and.intro (and.elim_right Hqp) (and.elim_left Hqp))\n'
             + 'print "end of file!"\n'
     */
     