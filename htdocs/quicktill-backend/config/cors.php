<?php

return [
   'paths' => ['api/*', 'sanctum/csrf-cookie'],
    'allowed_origins' => ['http://localhost:3000'],
    'supports_credentials' => true,
    'allowed_methods' => ['*'],
    'allowed_headers' => ['*'],
    'max_age' => 0,
];
