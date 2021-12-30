;(function () {
    let dataPath = []
    let arrayKey = null
    const regex = /function\(\){_\.[a-zA-Z0-9$_]+\.prototype\.[a-zA-Z0-9$_]+\.call\(this\);[a-zA-Z0-9$_]+\(this\)}/

    const finder = setInterval(attemptHook, 1)

    function attemptHook() {
        log(`Attempting hook...`)
        outer: for (const [_k, v] of Object.entries(
            window.default_MeetingsUi
        )) {
            if (v && v.prototype) {
                for (const k of Object.keys(v.prototype)) {
                    const p = Object.getOwnPropertyDescriptor(v.prototype, k)
                    if (p && p.value && !v.prototype[k].__grid_ran) {
                        let funcString = p.value.toString()
                        if (regex.test(funcString)) {
                            const og = v.prototype[k]
                            v.prototype[k] = function () {
                                window.dispatchEvent(
                                    new CustomEvent('atd', { detail: this })
                                )
                                og.call(this)
                            }
                            log(
                                `Successfully hooked into participant data function at ${_k}.prototype.${k}.`
                            )
                            clearInterval(finder)
                            break outer
                        }
                    }
                }
            }
        }
    }

    window.addEventListener('atd', function (event) {
        if (dataPath.length === 0) {
            outer: for (const [___k, ___v] of Object.entries(event.detail)) {
                if (___v) {
                    for (const [__k, __v] of Object.entries(___v)) {
                        if (__v) {
                            for (const [_k, _v] of Object.entries(__v)) {
                                if (_v && _v instanceof Map && _v.size > 0) {
                                    const [k, v] = _v.entries().next().value
                                    if (
                                        typeof k === 'string' &&
                                        k.substring(0, 7) === 'spaces/'
                                    ) {
                                        for (const [k_, v_] of Object.entries(
                                            v
                                        )) {
                                            if (
                                                v_ &&
                                                v_.hasOwnProperty('data')
                                            ) {
                                                dataPath = [
                                                    ___k,
                                                    __k,
                                                    _k,
                                                    k,
                                                    k_,
                                                    'data',
                                                ]
                                                for (const v__ of Object.values(
                                                    v_.data
                                                )) {
                                                    for (const [
                                                        k___,
                                                        v___,
                                                    ] of Object.entries(v__)) {
                                                        if (
                                                            Array.isArray(v___)
                                                        ) {
                                                            arrayKey = k___
                                                            log(
                                                                'Found path to participant data.'
                                                            )
                                                            break outer
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
        const data = event.detail[dataPath[0]][dataPath[1]][dataPath[2]].get(
            dataPath[3]
        )[dataPath[4]][dataPath[5]]

        let names = []
        console.log(data)
        const regex = /(\(|\[)([^\(\[\)\]]+)(\)|\])/
        for (const v of Object.values(data)) {
            const array = v[arrayKey]
            if (array[4] && array[6].length === 0 && array[20] == undefined) {
                const fullName = array[1]
                if (fullName.includes(',')) {
                    const names = fullName.split(/,(.+)/)
                    var firstName = names[1]
                    var lastName = names[0]
                } else {
                    firstName = array[28]
                    lastName = fullName.replace(firstName, '')
                }
                firstName = firstName.replace(regex, '').trim()
                lastName = lastName.replace(regex, '').trim()
                names.push(firstName + ' ' + lastName)
                console.log("entering")
            }
        }
        window.postMessage(
            {
                attendance: names,
                sender: 'inject-message',
            },
            'https://meet.google.com')
    })

    function log(message) {
        console.log(
            `%c[A4GM]%c ${message} `,
            'color:white;background:#058D80',
            'font-weight:bold;color:#058D80;'
        )
    }
})()