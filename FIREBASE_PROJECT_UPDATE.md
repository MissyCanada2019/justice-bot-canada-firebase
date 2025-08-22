# Firebase Project Update

## Issue
The `justice-bot-canada-firebase` directory was configured to use the Firebase project `justice-bot-canada551055`, but the correct Firebase project that should be used is `justicebotai`.

This was causing deployment failures because:
1. The Firebase configuration files throughout the project reference `justicebotai`
2. The environment variables are set up for `justicebotai`
3. The service accounts and IAM policies are configured for `justicebotai`

## Solution
Updated the `.firebaserc` file in the `justice-bot-canada-firebase` directory to use `justicebotai` as the default project:

```json
{
  "projects": {
    "default": "justicebotai"
  },
  "targets": {},
  "etags": {}
}
```

## Verification
After this change, Firebase deployments should work correctly as all other configuration files are already set up to use the `justicebotai` project.

## Files Verified
- `.firebaserc` - Updated to use correct project
- `firebase.json` - Does not contain hardcoded project IDs
- Other Firebase configuration files (`firestore.rules`, `storage.rules`, etc.) - Do not contain hardcoded project IDs

## Next Steps
Test Firebase deployment to verify the fix works correctly.