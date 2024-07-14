import 'package:document_editor/screen/document.dart';
import 'package:document_editor/screen/login.dart';
import 'package:flutter/material.dart';
import 'package:routemaster/routemaster.dart';
import 'package:document_editor/screen/home.dart';

final loggedOutRoute = RouteMap(routes: {
  '/': (route) => const MaterialPage(child: LoginScreen()),
});

final loggedInRoute = RouteMap(routes: {
  '/': (route) => const MaterialPage(child: Homescreen()),
  '/document/:id': (route) => MaterialPage(
        child: DocumentScreen(
          id: route.pathParameters['id'] ?? '',
        ),
      ),
});
