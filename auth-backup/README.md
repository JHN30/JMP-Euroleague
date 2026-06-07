# Auth/Admin Backup

This folder was created before removing active auth and admin functionality from the app.

The saved code lives in `original-files/` with the same paths it had in the project, so files can be copied back into place later when auth, Stripe, or admin tooling is rebuilt.

What is included:

- Frontend auth pages, profile page, auth hook, password/input components, navbar files, layout shell, and `App.jsx`.
- Frontend admin pages and admin components.
- Backend auth controller, route, user model, token middleware, token utility, Mailtrap email files, Cloudinary admin upload config, and backend route/controller files touched by auth/admin removal.
- Root and frontend package manifests and lockfiles from before dependency cleanup.

The active project is intended to be public-only after this backup: no login, signup, profile, admin dashboard, auth API, or protected write/import API routes.
