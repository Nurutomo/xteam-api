import got from 'got'
import crypto from 'crypto'
import { URL, URLSearchParams } from 'url'

const genAPI = (apikey: string) => got.extend({
    prefixUrl: 'https://api.xteam.xyz',
    handlers: [
        (options, next) => {
            if (options.searchParams === undefined) options.searchParams = new URLSearchParams
            options.searchParams.append('APIKEY', apikey)

            return next(options)
        }
    ],
    hooks: {
        afterResponse: [
            response => {
                try {
                    response.body = JSON.parse(response.rawBody.toString())
                } catch (e) {
                    if (response.headers['content-type']?.startsWith('text/') || response.statusCode >= 500) {
                        response.body = response.rawBody.toString()
                        if (response.statusCode >= 500) response.body = `(${response.statusCode}) ${response.statusMessage}`
                    } else {
                        response.body = response.rawBody
                    }
                }
                return response
            }
        ]
    }
})

let _apikey = ''
export const API = Object.defineProperty({
    genAPI,
    api: genAPI(_apikey),
    check_apikey: async (apikey?: string) => {
        if (apikey) return (await genAPI(apikey).get('cekey')).body
        return (await API.api.get('cekey')).body
    },
    dl: {
        ytmp4: async (url: string | URL) => (await API.api.get('dl/ytmp4', {
            searchParams: { url: url.toString() }
        })).body,
        ytmp3: async (url: string | URL) => (await API.api.get('dl/ytmp3', {
            searchParams: { url: url.toString() }
        })).body,
        play: async (lagu: string) => (await API.api.get('dl/play', {
            searchParams: { lagu }
        })).body,
        tiktok: async (url: string | URL) => (await API.api.get('dl/tiktok', {
            searchParams: { url: url.toString() }
        })).body,
        facebook: async (url: string | URL) => (await API.api.get('dl/fb', {
            searchParams: { url: url.toString() }
        })).body,
        instagram: async (url: string | URL) => (await API.api.get('dl/ig', {
            searchParams: { url: url.toString() }
        })).body,
        twitter: async (url: string | URL) => (await API.api.get('dl/twitter', {
            searchParams: { url: url.toString() }
        })).body,
        instagram_hashtag: async (nama: string) => (await API.api.get('dl/ighastag', {
            searchParams: { nama }
        })).body,
        instagram_highlight: async (nama: string) => (await API.api.get('dl/ighighlight', {
            searchParams: { nama }
        })).body,
        instagram_story: async (nama: string) => (await API.api.get('dl/igs', {
            searchParams: { nama }
        })).body,
        instagram_stalk: async (nama: string) => (await API.api.get('dl/igstalk', {
            searchParams: { nama }
        })).body,
        mediafire: async (url: string | URL) => (await API.api.get('dl/mediafire', {
            searchParams: { url: url.toString() }
        })).body,
        sfile: async (url: string | URL) => (await API.api.get('dl/sfiledl', {
            searchParams: { url: url.toString() }
        })).body,
        google_drive: async (url: string | URL) => (await API.api.get('dl/drive', {
            searchParams: { url: url.toString() }
        })).body,
        gif2video: async (url: string | URL) => (await API.api.get('dl/giftovideo', {
            searchParams: { url: url.toString() }
        })).body,
        smule: async (url: string | URL) => (await API.api.get('dl/smule', {
            searchParams: { url: url.toString() }
        })).body,
        scribd: async (url: string | URL) => (await API.api.get('dl/scribd', {
            searchParams: { url: url.toString() }
        })).body,
        soundcloud: async (url: string | URL) => (await API.api.get('dl/soundcloud', {
            searchParams: { url: url.toString() }
        })).body,
        pinterest: async (url: string | URL) => (await API.api.get('dl/pinterestdl', {
            searchParams: { url: url.toString() }
        })).body,
        sharechat: async (url: string | URL) => (await API.api.get('dl/sharechatdl', {
            searchParams: { url: url.toString() }
        })).body,
        linkedin: async (url: string | URL) => (await API.api.get('dl/linkedin', {
            searchParams: { url: url.toString() }
        })).body,
        snackvideo: async (url: string | URL) => (await API.api.get('dl/snackvideo', {
            searchParams: { url: url.toString() }
        })).body,
        joox: async (lagu: string) => (await API.api.get('dl/joox', {
            searchParams: { lagu }
        })).body,
    },
    educational: {
        kbbi: async (kata: string) => (await API.api.get('kbbi', {
            searchParams: { kata }
        })).body,
        info_loker: async (query: string) => (await API.api.get('infoloker', {
            searchParams: { q: query }
        })).body,
        brainly: async (soal: string) => (await API.api.get('brainly', {
            searchParams: { soal }
        })).body,
        cuaca: async (kota: string) => (await API.api.get('cuaca', {
            searchParams: { kota }
        })).body,
        jadwal_sholat: async (kota: string) => (await API.api.get('jadwalsholat', {
            searchParams: { kota }
        })).body,
        kodepos: async (query: string) => (await API.api.get('kodepos', {
            searchParams: { q: query }
        })).body,
        wiki: async (query: string) => (await API.api.get('wiki', {
            searchParams: { q: query }
        })).body,
        chord: async (lagu: string) => (await API.api.get('chord', {
            searchParams: { lagu }
        })).body,
        removebg: async (url: string | URL) => (await API.api.get('removebg', {
            searchParams: { url: url.toString() }
        })).body,
    },
    news: {
        detik: async () => (await API.api.get('news/detik')).body,
        kompas: async () => (await API.api.get('news/kompas')).body,
        liputan6: async () => (await API.api.get('news/liputan6')).body,
        tribunews: async () => (await API.api.get('news/tribunews')).body,
        jalantikus: async () => (await API.api.get('news/jalantikus')).body,
    },
    trendingtwitter: Object.assign(
        async () => (await API.api.get('trendingtwitter')).body,
        {
            bekasi: async () => (await API.api.get('trendingtwitter/bekasi')).body,
            depok: async () => (await API.api.get('trendingtwitter/depok')).body,
            pekanbaru: async () => (await API.api.get('trendingtwitter/pekanbaru')).body,
            surabaya: async () => (await API.api.get('trendingtwitter/surabaya')).body,
            makssar: async () => (await API.api.get('trendingtwitter/makassar')).body,
            bandung: async () => (await API.api.get('trendingtwitter/bandung')).body,
            jakarta: async () => (await API.api.get('trendingtwitter/jakarta')).body,
            medan: async () => (await API.api.get('trendingtwitter/medan')).body,
            palembang: async () => (await API.api.get('trendingtwitter/palembang')).body,
            semarang: async () => (await API.api.get('trendingtwitter/semarang')).body,
            tangerang: async () => (await API.api.get('trendingtwitter/tangerang')).body,
        }
    ),
    simsimi: async (kata: string) => (await API.api.get('simsimi', {
        searchParams: { kata }
    })).body,
    simsimiv2: async (kata: string) => (await API.api.get('simsimi', {
        searchParams: { kata }
    })).body,
    search: {
        yt: async (query: string) => (await API.api.get('search/ytsearch', {
            searchParams: { q: query }
        })).body,
        wattpad: Object.assign(
            async (query: string) => (await API.api.get('search/ytsearch', {
                searchParams: { q: query }
            })).body,
            {
                story_info: async (url: string | URL) => (await API.api.get('search/wattpadstoryinfo', {
                    searchParams: { url: url.toString() }
                })).body,
                baca: async (url: string | URL) => (await API.api.get('search/wattpadbaca', {
                    searchParams: { url: url.toString() }
                })).body,
                bulk: async (query: string) => (await API.api.get('search/wattpadbulk', {
                    searchParams: { q: query }
                })).body,
            }
        ),
        joox: {
            find: async (query: string) => (await API.api.get('search/jooxfind', {
                searchParams: { q: query }
            })).body,
            lyrics: async (query: string) => (await API.api.get('search/jooxlyrics', {
                searchParams: { q: query }
            })).body,
        },
        shopee: Object.assign(
            async (query: string) => (await API.api.get('search/shopeesearch', {
                searchParams: { q: query }
            })).body,
            {
                flashsale: async () => (await API.api.get('search/flashsale')).body
            }
        ),
        whatsapp_group: async (query: string) => (await API.api.get('search/grupwa', {
            searchParams: { q: query }
        })).body,
        domainesia: async (query: string) => (await API.api.get('search/domainesia', {
            searchParams: { q: query }
        })).body,
        mobile_legend: {
            hero: async (query: string) => (await API.api.get('search/heroml', {
                searchParams: { q: query }
            })).body,
        },
        free_fire: {
            id: async (id: number) => (await API.api.get('search/freefire', {
                searchParams: { id: id.toString() }
            })).body,
        },
        peribahasa: async (query: string) => (await API.api.get('search/peribahasa', {
            searchParams: { q: query }
        })).body,
    },
    asupan: {
        shitpost: async () => (await API.api.get('asupan')).body,
        lasegar: async () => (await API.api.get('asupan/lasegar')).body,
        ptl: async () => (await API.api.get('asupan/ptl')).body,
        wibu: async () => (await API.api.get('asupan/wibu')).body,
        dark_joke: async () => (await API.api.get('asupan/darkjoke')).body,
    },
    anime: {
        dewabatch: async (query: string) => (await API.api.get('anime/dewabatch', {
            searchParams: { q: query }
        })).body,
        kusonime: async (query: string) => (await API.api.get('anime/kusonime', {
            searchParams: { q: query }
        })).body,
        samehadaku: async (query: string) => (await API.api.get('anime/samehadaku', {
            searchParams: { q: query }
        })).body,
        nekonime: async () => (await API.api.get('anime/nekonime')).body,
        waifu: async () => (await API.api.get('anime/waifu')).body,
        meganebuk: async (query: string) => (await API.api.get('anime/meganebuk', {
            searchParams: { q: query }
        })).body,
        webtoon: async (url: string | URL) => (await API.api.get('anime/webtoon', {
            searchParams: { url: url.toString() }
        })).body,
    },
    encrypt: {
        bs64_enc: (text: string | Buffer | Uint8Array | number[]) => Buffer.from(text).toString('base64'),
        bs64_dec: (text: string) => Buffer.from(text, 'base64').toString(),
        b32_enc: async (text: string) => (await API.api.get('encrypt/b32enc', {
            searchParams: { text }
        })).body,
        b32_dec: async (text: string) => (await API.api.get('encrypt/b32dec', {
            searchParams: { text }
        })).body,
        sha1: (text: crypto.BinaryLike) => crypto.createHash('sha1').update(text).digest('hex'),
        sha256: (text: crypto.BinaryLike) => crypto.createHash('sha256').update(text).digest('hex'),
        sha512: (text: crypto.BinaryLike) => crypto.createHash('sha512').update(text).digest('hex'),
    },
    magernulis: async (text: string, nama?: string, kelas?: string) => (await API.api.get('magernulis', {
        searchParams: { text, nama, kelas }
    })).body,
    magernulis2: async (text: string, nama?: string, kelas?: string) => (await API.api.get('magernulis2', {
        searchParams: { text, nama, kelas }
    })).body,
    magernulis3: async (text: string, nama?: string, kelas?: string) => (await API.api.get('magernulis3', {
        searchParams: { text, nama, kelas }
    })).body,
    magernulis4: async (text: string, nama?: string, kelas?: string) => (await API.api.get('magernulis4', {
        searchParams: { text, nama, kelas }
    })).body,
    magernulis5: async (text: string, nama?: string, kelas?: string) => (await API.api.get('magernulis5', {
        searchParams: { text, nama, kelas }
    })).body,
    magernulis6: async (text: string, nama?: string, kelas?: string) => (await API.api.get('magernulis6', {
        searchParams: { text, nama, kelas }
    })).body,
    aksara: {
        latin_to_java: async (text: string) => (await API.api.get('aksara/latinkejawa', {
            searchParams: { text }
        })).body,
        java_to_latin: async (text: string) => (await API.api.get('aksara/jawakelatin', {
            searchParams: { text }
        })).body,
        latin_to_sunda: async (text: string) => (await API.api.get('aksara/latinkesunda', {
            searchParams: { text }
        })).body,
        sunda_to_latin: async (text: string) => (await API.api.get('aksara/sundakelatin', {
            searchParams: { text }
        })).body,
    },
    video_maker: {
        shaun_the_sheep: async (url: string | URL) => (await API.api.get('videomaker/shaunthesheep', {
            searchParams: { url: url.toString() }
        })).body,
        poly: async (text: string) => (await API.api.get('videomaker/poly', {
            searchParams: { text }
        })).body,
        bold: async (text: string) => (await API.api.get('videomaker/bold', {
            searchParams: { text }
        })).body,
        glowing: async (text: string) => (await API.api.get('videomaker/glowing', {
            searchParams: { text }
        })).body,
        colorful: async (text: string) => (await API.api.get('videomaker/colorful', {
            searchParams: { text }
        })).body,
        army: async (text: string) => (await API.api.get('videomaker/army', {
            searchParams: { text }
        })).body,
        retro: async (text: string) => (await API.api.get('videomaker/retro', {
            searchParams: { text }
        })).body,
    },
    textpro: async (effect?: string, text?: string, text2?: string) => {
        if (!effect) return (await API.api.get('textpro')).body
        return (await API.api.get('textpro/' + effect, {
            searchParams: { text, text2 }
        })).body
    },
    photooxy: async (effect?: string, text?: string, text2?: string) => {
        if (!effect) return (await API.api.get('photooxy')).body
        return (await API.api.get('photooxy/' + effect, {
            searchParams: { text, text2 }
        })).body
    },
    random_images: {
        blackpink: async () => (await API.api.get('randomimage/blackpink')).body,
        cewek: async () => (await API.api.get('randomimage/cewe')).body,
        cowok: async () => (await API.api.get('randomimage/cowo')).body,
        shota: async () => (await API.api.get('randomimage/shota')).body,
        bts: async () => (await API.api.get('randomimage/bts')).body,
        exo: async () => (await API.api.get('randomimage/exo')).body,
        meme: async () => (await API.api.get('randomimage/meme')).body,
        meme2: async () => (await API.api.get('randomimage/meme2')).body,
        dark: async () => (await API.api.get('randomimage/dark')).body,
        darkjoke: async () => (await API.api.get('randomimage/darkjoke')).body,
        husbu: async () => (await API.api.get('randomimage/husbu')).body,
        husbu2: async () => (await API.api.get('randomimage/husbu2')).body,
        wallpaper: async () => (await API.api.get('randomimage/wallpaper')).body,
        wallpaper2: async () => (await API.api.get('randomimage/wallpaper2')).body,
        wallpaper3: async () => (await API.api.get('randomimage/wallpaper3')).body,
        wallpaper4: async () => (await API.api.get('randomimage/wallpaper4')).body,
        wallpaper5: async () => (await API.api.get('randomimage/wallpaper5')).body,
        ahegao: async () => (await API.api.get('randomimage/ahegao')).body,
        ass: async () => (await API.api.get('randomimage/ass')).body,
        bdsm: async () => (await API.api.get('randomimage/bdsm')).body,
        blowjob: async () => (await API.api.get('randomimage/blowjob')).body,
        cuckoid: async () => (await API.api.get('randomimage/cuckoid')).body,
        ero: async () => (await API.api.get('randomimage/ero')).body,
        gangbang: async () => (await API.api.get('randomimage/gangbang')).body,
        glasses: async () => (await API.api.get('randomimage/glasses')).body,
        hentai: async (isGif: Boolean = false) => (await API.api.get('randomimage/hentai' + (isGif ? 'gif' : ''))).body,
        jahy: async () => (await API.api.get('randomimage/jahy')).body,
        manga: async () => (await API.api.get('randomimage/manga')).body,
        masturbate: async () => (await API.api.get('randomimage/mstrb')).body,
        nfsw_neko: async () => (await API.api.get('randomimage/nsfwneko')).body,
        orgy: async () => (await API.api.get('randomimage/orgy')).body,
        panties: async () => (await API.api.get('randomimage/panties')).body,
        pussy: async () => (await API.api.get('randomimage/pussy')).body,
        sfw_neko: async () => (await API.api.get('randomimage/sfwneko')).body,
        tentacles: async () => (await API.api.get('randomimage/tentacles')).body,
        thighs: async () => (await API.api.get('randomimage/thighs')).body,
        uniform: async () => (await API.api.get('randomimage/uniform')).body,
        wpmobile: async () => (await API.api.get('randomimage/wpmobile')).body,
        wpmobile_nsfw: async () => (await API.api.get('randomimage/wpnfswmobile')).body,
        zettairyouiki: async () => (await API.api.get('randomimage/zettairyouiki')).body,
    },
    sticker: {
        stickerly: async (query: string) => (await API.api.get('sticker/stickerly', {
            searchParams: { q: query }
        })).body,
        sticker_line: async (url: string | URL) => (await API.api.get('sticker/stickerline', {
            searchParams: { url: url.toString() }
        })).body,
        sticker_pack: async (query: string) => (await API.api.get('sticker/stickpack', {
            searchParams: { q: query }
        })).body,
        emoji_to_png: async (query: string) => (await API.api.get('sticker/emojitopng', {
            searchParams: { emo: query }
        })).body,
        wm: async (url: string | URL) => (await API.api.get('sticker/wm', {
            searchParams: { url: url.toString() }
        })).body,
    },
    primbon: {
        arti_nama: async (nama: string) => (await API.api.get('primbon/artinama', {
            searchParams: { q: nama }
        })).body,
        kecocokan_nama: async (nama: string, { tanggal, bulan, tahun }: {
            tanggal: number,
            bulan: number,
            tahun: number
        }) => (await API.api.get('primbon/kecocokannama', {
            searchParams: {
                nama,
                tgl: tanggal.toString(),
                bln: bulan.toString(),
                thn: tahun.toString(),
            }
        })).body,
        nomor_hoki: async (no: string) => (await API.api.get('primbon/nomorhoki', {
            searchParams: { no }
        })).body,
        ramalan_jodoh: async ({ nama, tanggal, bulan, tahun }: {
            nama: string,
            tanggal: number,
            bulan: number,
            tahun: number,
        }, { nama: nama2, tanggal: tanggal2, bulan: bulan2, tahun: tahun2 }: {
            nama: string,
            tanggal: number,
            bulan: number,
            tahun: number,
        }, isBali: Boolean = false) => (await API.api.get('primbon/ramalanjodoh' + (isBali ? 'bali' : ''), {
            searchParams: {
                nama1: nama,
                nama2,
                tgl1: tanggal.toString(),
                bln1: bulan.toString(),
                thn1: tahun.toString(),
                tgl2: tanggal2.toString(),
                bln2: bulan2.toString(),
                thn2: tahun2.toString(),
            }
        })).body,
        ramalan_suami_istri: async ({ nama, tanggal, bulan, tahun }: {
            nama: string,
            tanggal: number,
            bulan: number,
            tahun: number,
        }, { nama: nama2, tanggal: tanggal2, bulan: bulan2, tahun: tahun2 }: {
            nama: string,
            tanggal: number,
            bulan: number,
            tahun: number,
        }) => (await API.api.get('primbon/ramalansuamiistri', {
            searchParams: {
                nama1: nama,
                nama2,
                tgl1: tanggal.toString(),
                bln1: bulan.toString(),
                thn1: tahun.toString(),
                tgl2: tanggal2.toString(),
                bln2: bulan2.toString(),
                thn2: tahun2.toString(),
            }
        })).body,
        tafsir_mimpi: async (query: string) => (await API.api.get('primbon/tafsirmimpi', {
            searchParams: { q: query }
        })).body,
    },
    game: {
        suit: async (pilihan: 'kertas' | 'batu' | 'gunting') => (await API.api.get('game/suit', {
            searchParams: { q: pilihan }
        })).body,
        tebakangka: async (pilihan: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10) => (await API.api.get('game/tebakangka', {
            searchParams: { q: pilihan.toString() }
        })).body,
        tebakbendera: async () => (await API.api.get('game/tebakbendera')).body,
        amongus: async () => (await API.api.get('game/amongus')).body,
        family100: async () => (await API.api.get('game/family100')).body,
        tebakgambar: async () => (await API.api.get('game/tebakgambar')).body,
        virtual_slot: async () => (await API.api.get('game/virtualslot')).body,
        asah_otak: async () => (await API.api.get('game/asahotak')).body,
        siapakah_aku: async () => (await API.api.get('game/siapakahaku')).body,
        susun_kata: async () => (await API.api.get('game/susunkata')).body,
        tebak_kata: async () => (await API.api.get('game/tebakkata')).body,
        tebak_tebakan: async () => (await API.api.get('game/tebaktebakan')).body,
    },
    short_url: {
        bitly: async (url: string | URL) => (await API.api.get('shorturl/bitly', {
            searchParams: { url: url.toString() }
        })).body,
        cutly: async (url: string | URL, nama?: string) => (await API.api.get(`shorturl/${nama ? 'custom' : ''}cutly`, {
            searchParams: { url: url.toString(), nama }
        })).body,
        gg: async (url: string | URL, nama?: string) => (await API.api.get(`shorturl/${nama ? 'custom' : ''}gg`, {
            searchParams: { url: url.toString(), nama }
        })).body,
        shorturl: async (url: string | URL) => (await API.api.get('shorturl/shorturlat', {
            searchParams: { url: url.toString() }
        })).body,
        sid: async (url: string | URL) => (await API.api.get('shorturl/sid', {
            searchParams: { url: url.toString() }
        })).body,
        tinyurl: async (url: string | URL) => (await API.api.get('shorturl/tinyurl', {
            searchParams: { url: url.toString() }
        })).body,
    },
    spammer: Object.assign(
        async (no: number) => (await API.api.get('spammer/allspam', {
            searchParams: { no: no.toString() }
        })).body,
        {
            pizza_hut: async (no: number) => (await API.api.get('spammer/pizzahut', {
                searchParams: { no: no.toString() }
            })).body,
            olx: async (no: number) => (await API.api.get('spammer/olx', {
                searchParams: { no: no.toString() }
            })).body,
            jagereward: async (no: number) => (await API.api.get('spammer/', {
                searchParams: { no: no.toString() }
            })).body,
            dana_cita: async (no: number) => (await API.api.get('spammer/danacita', {
                searchParams: { no: no.toString() }
            })).body,
            akademi: async (no: number) => (await API.api.get('spammer/akademi', {
                searchParams: { no: no.toString() }
            })).body,
            icq: async (no: number) => (await API.api.get('spammer/icq', {
                searchParams: { no: no.toString() }
            })).body,
        }
    ),
    other: {
        tebakgambar: async (url: string | URL) => (await API.api.get('tebakgambar')).body,
        quotemaker: async (text: string, wm: string) => (await API.api.get('quotemaker', {
            searchParams: { text, wm }
        })).body,
        ssweb: async (url: string | URL) => (await API.api.get('ss', {
            searchParams: { url: url.toString() }
        })).body,
        harta_tahta: async (text: string) => (await API.api.get('quotemaker', {
            searchParams: { text }
        })).body,
        shitpost: async (text: string, wm: string) => (await API.api.get('shitpost')).body,
        image_to_pdf: async (url: string | URL) => (await API.api.get('imagetopdf', {
            searchParams: { url: url.toString() }
        })).body,
        meme_maker: async (url: string | URL, text: string, text2: string) => (await API.api.get('imagetopdf', {
            searchParams: { url: url.toString(), text, text2 }
        })).body,
    },
    free: {
        ttp: async (text: string, responseJson: Boolean = true) => (await API.api.get('ttp', {
            searchParams: { ...(responseJson ? {} : { file: '' }), text }
        })).body,
        attp: async (text: string, responseJson: Boolean = true) => (await API.api.get('attp', {
            searchParams: { ...(responseJson ? {} : { file: '' }), text }
        })).body
    }
}, 'apikey', {
    set: (value: string) => {
        _apikey = value
        API.api = genAPI(value)
    },
    get: () => {
        return _apikey
    }
})
