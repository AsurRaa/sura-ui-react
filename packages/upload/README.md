# @sura-upload

# basic

**Provider**

```tsx
<AsurRaaUploadProvider
  header={{ authorization: `Bearer ${token}` }}
  postUrl={`${BASE_API_URL}${REST_URI_ENUM.UPLOAD_SINGLE_IMAGE}`}
>
  <App />
</AsurRaaUploadProvider>
```

**Components usage**

```tsx
<AsurRaaSingleUpload
  defaultImage={editableData?.avatar}
  getReturnUrl={(img: uploadInterface) => {
    setImageState(img?.uuid);
  }}
/>
```

**Return Image back**

```tsx
<Image
  preview={isError ? false : props.isPreview}
  draggable={false}
  src={getReturnSingleImageFromServer(props.value)}
  width={100}
  fallback={defaultImage}
/>
```
