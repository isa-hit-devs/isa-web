const express = require('express');
const helmet = require('helmet');
const postRoutes = require('./routes/postRoutes')
const authRoutes = require('./routes/authRoutes')
const adminPostRoutes = require('./routes/adminPostRoutes')
const adminMembersRoutes = require('./routes/adminMembersRoutes')
const adminAlumniRoutes = require('./routes/adminAlumniRoutes')
const alumniRoutes = require('./routes/alumniRoutes')
const membersRoutes = require('./routes/membersRoutes')
const {limiter} = require('./middleware/limiter');
const morgan = require('morgan')
const app = express();
app.use(helmet());
app.use(express.json());
app.use(limiter)
app.use(morgan('dev'))

app.use('/api/posts', postRoutes);
app.use('/api/admin/posts',adminPostRoutes)
app.use('/api/auth', authRoutes);
app.use('/api/admin/members',adminMembersRoutes);
app.use('/api/members',membersRoutes);
app.use('/api/admin/alumni',adminAlumniRoutes)
app.use('/api/alumni',alumniRoutes)
app.get('/', (req, res) => {
    res.send("Hello ISA!");
});

module.exports = app;