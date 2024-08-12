import 'package:document_editor/screen/document.dart';
import 'package:document_editor/screen/home.dart';
import 'package:document_editor/screen/login.dart';
import 'package:flutter/material.dart';
import 'package:routemaster/routemaster.dart';

//this is for the routemaster or for the state persistance
//if the user is loggedout then the loginscreen is displayed
final loggedOutRoute = RouteMap(routes: {
  '/': (route) => const MaterialPage(child: LoginScreen()),
});

//if the user is not logged out then it show the homescreen
//or the page of document called document screen
final loggedInRoute = RouteMap(routes: {
  '/': (route) => const MaterialPage(child: Homescreen()),
  '/document/:id': (route) => MaterialPage(
        child: DocumentScreen(
          id: route.pathParameters['id'] ?? '',
        ),
      ),
});
