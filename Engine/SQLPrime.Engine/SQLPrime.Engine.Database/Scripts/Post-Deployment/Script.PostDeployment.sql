PRINT 'Starting Post-Deployment Script.......'
PRINT ''

PRINT '--- Upsert Lookup data'
:r .\Migrations\01_LookupData.sql


PRINT '--- Upsert Seed data'
:r .\Migrations\02_SeedData.sql


PRINT '--- Post Deployment cleanup'
:r .\Migrations\99_Cleanup.sql


PRINT 'Post-Deployment Script complete'
PRINT ''