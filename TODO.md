- [x] Create a `README.md` file describing the project
  - [ ] Add as content the necessary steps to boostrap the projects
- [ ] Ensure every model domain rules for each model
  - [ ] Booking
  - [ ] Car
  - [ ] Season
  - [ ] User
- [ ] Ensure every usecase rules for each usecase
- [ ] Each use case rule should include a "scope" flag for user permissions
- [ ] Design the system using a multi-tenant architecture
- [ ] Frontend must adapt to different dealers (e.g., colors and images)
- [ ] Permission handling should be based on RBAC (Role-Based Access Control)
- [ ] Save login credentials in different database table (extra security layer)
- [ ] Implement frontend with i18n support
  - [ ] Before login the i18n language is determined by the browser
  - [ ] Switching linguage accordding to user preference after login
- [ ] Provide a project boostrap flow
  - [ ] Create a docker-compose file
    - [ ] Set database environment variables
  - [ ] Create migration seeds to auto populate the database
- [ ] Record value changes should be persisted in the database
  - [ ] Use `@EventSubscriber` from TypeORM  to listen to changes events
