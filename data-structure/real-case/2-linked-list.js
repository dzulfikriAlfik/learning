// ============================================
// Real Case: Playlist Lagu dengan Linked List
// ============================================

class Song {
  constructor(id, title, singer) {
    this.id = id;
    this.title = title;
    this.singer = singer;
    this.next = null;
    this.prev = null;
  }
}

class Playlist {
  constructor(name) {
    this.name = name;
    this.head = null;
    this.tail = null;
    this.current = null; // lagu yang sedang diputar
    this.length = 0;
  }

  // Tambah lagu di akhir playlist
  addSong(id, title, singer) {
    const newSong = new Song(id, title, singer);

    if (!this.head) {
      this.head = newSong;
      this.tail = newSong;
      this.current = newSong;
    } else {
      newSong.prev = this.tail;
      this.tail.next = newSong;
      this.tail = newSong;
    }

    this.length++;
    console.log(`🎵 Lagu "${title}" oleh ${singer} ditambahkan ke playlist.`);
    return this;
  }

  // Tambah lagu di posisi tertentu (index mulai dari 0)
  addSongAt(index, id, title, singer) {
    if (index < 0 || index > this.length) {
      console.log("❌ Posisi tidak valid.");
      return this;
    }

    const newSong = new Song(id, title, singer);

    if (index === 0) {
      if (!this.head) {
        this.head = newSong;
        this.tail = newSong;
        this.current = newSong;
      } else {
        newSong.next = this.head;
        this.head.prev = newSong;
        this.head = newSong;
      }
    } else if (index === this.length) {
      newSong.prev = this.tail;
      this.tail.next = newSong;
      this.tail = newSong;
    } else {
      let current = this.head;
      for (let i = 0; i < index; i++) {
        current = current.next;
      }
      newSong.prev = current.prev;
      newSong.next = current;
      current.prev.next = newSong;
      current.prev = newSong;
    }

    this.length++;
    console.log(`🎵 Lagu "${title}" ditambahkan di posisi ${index}.`);
    return this;
  }

  // Hapus lagu berdasarkan ID
  removeSong(id) {
    if (!this.head) {
      console.log("❌ Playlist kosong.");
      return this;
    }

    let current = this.head;

    while (current) {
      if (current.id === id) {
        const title = current.title;

        // Jika lagu yang dihapus sedang diputar, pindah ke next
        if (this.current === current) {
          this.current = current.next || current.prev;
        }

        if (current === this.head && current === this.tail) {
          this.head = null;
          this.tail = null;
        } else if (current === this.head) {
          this.head = current.next;
          this.head.prev = null;
        } else if (current === this.tail) {
          this.tail = current.prev;
          this.tail.next = null;
        } else {
          current.prev.next = current.next;
          current.next.prev = current.prev;
        }

        this.length--;
        console.log(`🗑️  Lagu "${title}" dihapus dari playlist.`);
        return this;
      }
      current = current.next;
    }

    console.log(`❌ Lagu dengan ID ${id} tidak ditemukan.`);
    return this;
  }

  // Putar lagu saat ini
  play() {
    if (!this.current) {
      console.log("❌ Tidak ada lagu di playlist.");
      return;
    }
    console.log(`▶️  Sedang memutar: "${this.current.title}" - ${this.current.singer}`);
  }

  // Lagu selanjutnya
  next() {
    if (!this.current) {
      console.log("❌ Tidak ada lagu di playlist.");
      return;
    }

    if (this.current.next) {
      this.current = this.current.next;
    } else {
      this.current = this.head; // kembali ke awal (loop)
      console.log("🔁 Kembali ke awal playlist.");
    }

    this.play();
  }

  // Lagu sebelumnya
  prev() {
    if (!this.current) {
      console.log("❌ Tidak ada lagu di playlist.");
      return;
    }

    if (this.current.prev) {
      this.current = this.current.prev;
    } else {
      this.current = this.tail; // ke akhir (loop)
      console.log("🔁 Pindah ke akhir playlist.");
    }

    this.play();
  }

  // Cari lagu berdasarkan judul
  searchByTitle(keyword) {
    if (!this.head) {
      console.log("❌ Playlist kosong.");
      return [];
    }

    const results = [];
    let current = this.head;

    while (current) {
      if (current.title.toLowerCase().includes(keyword.toLowerCase())) {
        results.push({ id: current.id, title: current.title, singer: current.singer });
      }
      current = current.next;
    }

    if (results.length === 0) {
      console.log(`🔍 Tidak ditemukan lagu dengan kata kunci "${keyword}".`);
    } else {
      console.log(`🔍 Ditemukan ${results.length} lagu:`);
      results.forEach((s) => console.log(`   - [${s.id}] "${s.title}" oleh ${s.singer}`));
    }

    return results;
  }

  // Cari lagu berdasarkan penyanyi
  searchBySinger(keyword) {
    if (!this.head) {
      console.log("❌ Playlist kosong.");
      return [];
    }

    const results = [];
    let current = this.head;

    while (current) {
      if (current.singer.toLowerCase().includes(keyword.toLowerCase())) {
        results.push({ id: current.id, title: current.title, singer: current.singer });
      }
      current = current.next;
    }

    if (results.length === 0) {
      console.log(`🔍 Tidak ditemukan lagu dari penyanyi "${keyword}".`);
    } else {
      console.log(`🔍 Ditemukan ${results.length} lagu:`);
      results.forEach((s) => console.log(`   - [${s.id}] "${s.title}" oleh ${s.singer}`));
    }

    return results;
  }

  // Acak urutan playlist (shuffle)
  shuffle() {
    if (this.length <= 1) return this;

    // Konversi ke array, acak, lalu rebuild linked list
    const songs = [];
    let current = this.head;
    while (current) {
      songs.push({ id: current.id, title: current.title, singer: current.singer });
      current = current.next;
    }

    // Fisher-Yates shuffle
    for (let i = songs.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [songs[i], songs[j]] = [songs[j], songs[i]];
    }

    // Rebuild
    this.head = null;
    this.tail = null;
    this.length = 0;
    songs.forEach((s) => this.addSong(s.id, s.title, s.singer));

    console.log("🔀 Playlist diacak!");
    return this;
  }

  // Tampilkan seluruh playlist
  display() {
    if (!this.head) {
      console.log("❌ Playlist kosong.");
      return;
    }

    console.log(`\n🎶 Playlist: ${this.name}`);
    console.log("=".repeat(50));

    let current = this.head;
    let index = 1;

    while (current) {
      const isPlaying = current === this.current ? " ▶️ (Now Playing)" : "";
      console.log(`  ${index}. [${current.id}] "${current.title}" - ${current.singer}${isPlaying}`);
      current = current.next;
      index++;
    }

    console.log("=".repeat(50));
    console.log(`  Total: ${this.length} lagu\n`);
  }
}

// ============================================
// Demo Penggunaan
// ============================================

const myPlaylist = new Playlist("Lagu Favorit 2026");

// Menambah lagu ke playlist
myPlaylist.addSong(1, "Bohemian Rhapsody", "Queen");
myPlaylist.addSong(2, "Hotel California", "Eagles");
myPlaylist.addSong(3, "Smells Like Teen Spirit", "Nirvana");
myPlaylist.addSong(4, "Stairway to Heaven", "Led Zeppelin");
myPlaylist.addSong(5, "Imagine", "John Lennon");

// Tampilkan playlist
myPlaylist.display();

// Memutar lagu saat ini
myPlaylist.play();

// Lagu selanjutnya
console.log("\n--- Next ---");
myPlaylist.next();
myPlaylist.next();

// Lagu sebelumnya
console.log("\n--- Prev ---");
myPlaylist.prev();

// Tambah lagu di posisi tertentu
console.log("\n--- Tambah Lagu di Posisi 2 ---");
myPlaylist.addSongAt(2, 6, "Sweet Child O' Mine", "Guns N' Roses");
myPlaylist.display();

// Cari lagu
console.log("--- Cari Lagu ---");
myPlaylist.searchByTitle("hotel");
myPlaylist.searchBySinger("queen");

// Hapus lagu
console.log("\n--- Hapus Lagu ---");
myPlaylist.removeSong(3);
myPlaylist.display();

// Shuffle playlist
console.log("--- Shuffle ---");
myPlaylist.shuffle();
myPlaylist.display();

// Test loop: next dari lagu terakhir kembali ke awal
console.log("--- Test Loop ---");
myPlaylist.current = myPlaylist.tail;
myPlaylist.play();
myPlaylist.next();
