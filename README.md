# Backend Buddy

# Table of Contents

- [Background](#background)
- [Usage](#usage)
- [System Design](#system-design)

# Background

Over my time developing backends for various projects, I've landed on a system structure that works for me and I reuse most of the base ideas from over and over.

The design is built using inheritance and off the ideas of separating the system into abstract layers that can be extended for various implementations.

I enjoyed developing this structure, but now its use has become rather repetative, and tedious to reimplement. I decided to write a command line tool to speed up this process / do it all for you.

Not only will it save me time (ignoring of course the time it takes to create this), but will be fun to create.

Why work on my current projects when I can procrasinate and start a new project that will write my current projects?

# Usage

```
$ npx backend-buddy generate template.json
```

```
$ npx backend-buddy generate template.json ./server
```

# System Design
